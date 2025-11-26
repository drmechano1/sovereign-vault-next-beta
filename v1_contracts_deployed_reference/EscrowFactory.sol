// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

/**
 * @dev Provides information about the current execution context
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }
}

/**
 * @dev Contract module which allows children to implement an emergency stop
 */
abstract contract Pausable is Context {
    event Paused(address account);
    event Unpaused(address account);

    bool private _paused;

    constructor() {
        _paused = false;
    }

    modifier whenNotPaused() {
        require(!paused(), "Pausable: paused");
        _;
    }

    modifier whenPaused() {
        require(paused(), "Pausable: not paused");
        _;
    }

    function paused() public view virtual returns (bool) {
        return _paused;
    }

    function _pause() internal virtual whenNotPaused {
        _paused = true;
        emit Paused(_msgSender());
    }

    function _unpause() internal virtual whenPaused {
        _paused = false;
        emit Unpaused(_msgSender());
    }
}

/**
 * @dev Contract module that helps prevent reentrant calls
 */
abstract contract ReentrancyGuard {
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;
    uint256 private _status;

    constructor() {
        _status = _NOT_ENTERED;
    }

    modifier nonReentrant() {
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");
        _status = _ENTERED;
        _;
        _status = _NOT_ENTERED;
    }
}

/**
 * @dev Interface of the ERC20 standard
 */
interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

/**
 * @title SovereignVault Escrow
 * @notice Minimal, hardened escrow with time-based cancel window
 * @dev All security fixes applied
 */
contract Escrow is ReentrancyGuard, Pausable {
    enum Status { Open, Released, Canceled, Disputed, Resolved }

    address public immutable factory;
    address public immutable payer;
    address public immutable recipient;
    address public immutable token;
    uint256 public immutable amount;
    uint256 public immutable holdUntil;
    uint8   public immutable tier;

    Status  public status;

    modifier onlyPayer() { require(msg.sender == payer, "SV: not payer"); _; }
    modifier onlyRecipient() { require(msg.sender == recipient, "SV: not recipient"); _; }
    modifier onlyFactory() { require(msg.sender == factory, "SV: not factory"); _; }
    modifier inStatus(Status s) { require(status == s, "SV: bad status"); _; }

    event Released(address indexed to, uint256 amount);
    event Canceled(address indexed to, uint256 amount);
    event Disputed(address indexed by);
    event DisputeResolved(uint256 payerShare, uint256 recipientShare);

    constructor(
        address _payer,
        address _recipient,
        address _token,
        uint256 _amount,
        uint256 _holdSeconds,
        uint8   _tier
    ) payable {
        factory    = msg.sender;
        payer      = _payer;
        recipient  = _recipient;
        token      = _token;
        amount     = _amount;
        holdUntil  = block.timestamp + _holdSeconds;
        tier       = _tier;
        status     = Status.Open;

        if (_token == address(0)) {
            require(msg.value == _amount, "SV: native amount mismatch");
        } else {
            require(msg.value == 0, "SV: no native on ERC20");
        }
    }

    function cancel() external nonReentrant inStatus(Status.Open) whenNotPaused onlyPayer {
        require(block.timestamp < holdUntil, "SV: hold passed");
        status = Status.Canceled;
        _payout(payer, amount);
        emit Canceled(payer, amount);
    }

    function release() external nonReentrant inStatus(Status.Open) whenNotPaused onlyRecipient {
        if (tier == 0) {
            // Instant tier: recipient can release immediately
        } else {
            require(block.timestamp >= holdUntil, "SV: too early");
        }
        status = Status.Released;
        _payout(recipient, amount);
        emit Released(recipient, amount);
    }

    function dispute() external inStatus(Status.Open) whenNotPaused {
        require(tier >= 2, "SV: dispute tier");
        require(msg.sender == payer || msg.sender == recipient, "SV: not party");
        require(block.timestamp < holdUntil, "SV: hold passed");
        status = Status.Disputed;
        emit Disputed(msg.sender);
    }

    function resolveDispute(uint256 payerShare, uint256 recipientShare) 
        external 
        nonReentrant
        onlyFactory 
        inStatus(Status.Disputed)
        whenNotPaused
    {
        require(payerShare + recipientShare == amount, "SV: shares mismatch");
        status = Status.Resolved;
        
        if (payerShare > 0) {
            _payout(payer, payerShare);
        }
        if (recipientShare > 0) {
            _payout(recipient, recipientShare);
        }
        
        emit DisputeResolved(payerShare, recipientShare);
    }

    function pause() external onlyFactory { _pause(); }
    function unpause() external onlyFactory { _unpause(); }

    function _payout(address to, uint256 value) internal {
        if (token == address(0)) {
            (bool ok, ) = payable(to).call{value: value}("");
            require(ok, "SV: native send fail");
        } else {
            require(IERC20(token).transfer(to, value), "SV: token transfer fail");
        }
    }

    function getDetails() external view returns (
        address _payer,
        address _recipient,
        address _token,
        uint256 _amount,
        uint256 _holdUntil,
        uint8 _tier,
        Status _status,
        bool _canCancel,
        bool _canRelease
    ) {
        _payer = payer;
        _recipient = recipient;
        _token = token;
        _amount = amount;
        _holdUntil = holdUntil;
        _tier = tier;
        _status = status;
        _canCancel = (status == Status.Open && block.timestamp < holdUntil);
        _canRelease = (status == Status.Open && (tier == 0 || block.timestamp >= holdUntil));
    }

    receive() external payable {}
}

/**
 * @title SovereignVault EscrowFactory
 * @notice Deploys and manages escrow contracts
 * @dev All security validations applied
 */
contract EscrowFactory is Pausable {
    event NewEscrow(
        address indexed escrow, 
        address indexed payer, 
        address indexed recipient, 
        address token, 
        uint256 amount, 
        uint256 holdUntil, 
        uint8 tier
    );
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event PauseStatusChanged(bool paused);

    address public owner;
    
    uint256 public constant MIN_HOLD_TIME = 1 hours;
    uint256 public constant MAX_HOLD_TIME = 365 days;
    uint256 public constant SAFESEND_HOLD_TIME = 72 hours;

    modifier onlyOwner() { require(msg.sender == owner, "SVF: not owner"); _; }

    constructor() { 
        owner = msg.sender; 
    }

    function setPaused(bool p) external onlyOwner {
        if (p) _pause(); else _unpause();
        emit PauseStatusChanged(p);
    }

    function transferOwnership(address newOwner) external onlyOwner { 
        require(newOwner != address(0), "SVF: zero address");
        address oldOwner = owner;
        owner = newOwner; 
        emit OwnershipTransferred(oldOwner, newOwner);
    }

    function createEscrow(
        address recipient,
        address token,
        uint256 amount,
        uint256 holdSeconds,
        uint8   tier
    ) external payable whenNotPaused returns (address) {
        
        require(recipient != address(0), "SVF: zero recipient");
        require(amount > 0, "SVF: zero amount");
        
        if (tier > 0) {
            require(holdSeconds >= MIN_HOLD_TIME, "SVF: hold too short");
        }
        require(holdSeconds <= MAX_HOLD_TIME, "SVF: hold too long");

        Escrow newEscrow;
        
        if (token == address(0)) {
            require(msg.value == amount, "SVF: native mismatch");
            newEscrow = new Escrow{value: msg.value}(
                msg.sender, 
                recipient, 
                token, 
                amount, 
                holdSeconds, 
                tier
            );
        } else {
            require(msg.value == 0, "SVF: no native with ERC20");
            newEscrow = new Escrow(
                msg.sender, 
                recipient, 
                token, 
                amount, 
                holdSeconds, 
                tier
            );
            require(
                IERC20(token).transferFrom(msg.sender, address(newEscrow), amount),
                "SVF: token transfer fail"
            );
        }

        address escrowAddress = address(newEscrow);

        emit NewEscrow(
            escrowAddress,
            msg.sender,
            recipient,
            token,
            amount,
            newEscrow.holdUntil(),
            tier
        );
        
        return escrowAddress;
    }

    function resolveDispute(
        address payable escrowAddress,
        uint256 payerShare,
        uint256 recipientShare
    ) external onlyOwner {
        Escrow(escrowAddress).resolveDispute(payerShare, recipientShare);
    }

    function pauseEscrow(address payable escrowAddress) external onlyOwner {
        Escrow(escrowAddress).pause();
    }

    function unpauseEscrow(address payable escrowAddress) external onlyOwner {
        Escrow(escrowAddress).unpause();
    }

    function getSafeSendHoldTime() external pure returns (uint256) {
        return SAFESEND_HOLD_TIME;
    }
}