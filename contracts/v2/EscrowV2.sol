// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title EscrowV2
 * @notice SafeSend-style escrow with:
 *  - Time-locked holds
 *  - Optional disputes (tiers)
 *  - Protocol fee on successful release
 *
 * The fee is configured per-escrow at creation time by the factory and
 * cannot be changed afterwards.
 */

interface IEscrowToken {
    function transfer(address to, uint256 amount) external returns (bool);
}

abstract contract EscrowReentrancyGuard {
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;
    uint256 private _status = _NOT_ENTERED;

    modifier nonReentrant() {
        require(_status != _ENTERED, "EscrowV2: reentrant");
        _status = _ENTERED;
        _;
        _status = _NOT_ENTERED;
    }
}

abstract contract EscrowPausable {
    event Paused(address account);
    event Unpaused(address account);

    bool private _paused;

    modifier whenNotPaused() {
        require(!_paused, "EscrowV2: paused");
        _;
    }

    modifier whenPaused() {
        require(_paused, "EscrowV2: not paused");
        _;
    }

    function _pause() internal whenNotPaused {
        _paused = true;
        emit Paused(msg.sender);
    }

    function _unpause() internal whenPaused {
        _paused = false;
        emit Unpaused(msg.sender);
    }

    function paused() public view returns (bool) {
        return _paused;
    }
}

contract EscrowV2 is EscrowReentrancyGuard, EscrowPausable {
    enum Status { Open, Released, Canceled, Disputed, Resolved }

    address public immutable factory;
    address public immutable payer;
    address public immutable recipient;
    address public immutable token;    // address(0) = native
    uint256 public immutable amount;
    uint256 public immutable holdUntil;
    uint8   public immutable tier;     // 0 = instant, 1+ = time-lock, 2+ = dispute enabled

    // Protocol fee config (immutable for this escrow)
    address public immutable feeRecipient;
    uint16  public immutable feeBps;   // out of 10_000

    Status  public status;

    event Released(address indexed to, uint256 netAmount, uint256 feeAmount);
    event Canceled(address indexed to, uint256 amount);
    event Disputed(address indexed by);
    event DisputeResolved(uint256 payerShare, uint256 recipientShare);

    modifier onlyPayer() { require(msg.sender == payer, "EscrowV2: not payer"); _; }
    modifier onlyRecipient() { require(msg.sender == recipient, "EscrowV2: not recipient"); _; }
    modifier onlyFactory() { require(msg.sender == factory, "EscrowV2: not factory"); _; }
    modifier inStatus(Status s) { require(status == s, "EscrowV2: bad status"); _; }

    constructor(
        address _payer,
        address _recipient,
        address _token,
        uint256 _amount,
        uint256 _holdSeconds,
        uint8   _tier,
        address _feeRecipient,
        uint16  _feeBps
    ) payable {
        require(_payer != address(0), "EscrowV2: zero payer");
        require(_recipient != address(0), "EscrowV2: zero recipient");
        require(_amount > 0, "EscrowV2: zero amount");
        if (_feeBps > 0) {
            require(_feeRecipient != address(0), "EscrowV2: zero feeRecipient");
        }

        factory      = msg.sender;
        payer        = _payer;
        recipient    = _recipient;
        token        = _token;
        amount       = _amount;
        holdUntil    = block.timestamp + _holdSeconds;
        tier         = _tier;
        feeRecipient = _feeRecipient;
        feeBps       = _feeBps;
        status       = Status.Open;

        if (_token == address(0)) {
            require(msg.value == _amount, "EscrowV2: native amount mismatch");
        } else {
            require(msg.value == 0, "EscrowV2: no native with token");
        }
    }

    // ----------------------------------------------------------------------
    // Core logic
    // ----------------------------------------------------------------------

    function cancel() external nonReentrant inStatus(Status.Open) whenNotPaused onlyPayer {
        require(block.timestamp < holdUntil, "EscrowV2: hold passed");
        status = Status.Canceled;
        _payout(payer, amount);
        emit Canceled(payer, amount);
    }

    function release() external nonReentrant inStatus(Status.Open) whenNotPaused onlyRecipient {
        if (tier == 0) {
            // Instant tier
        } else {
            require(block.timestamp >= holdUntil, "EscrowV2: too early");
        }

        status = Status.Released;

        (uint256 feeAmount, uint256 netAmount) = _applyFee(amount);
        if (feeAmount > 0) {
            _payout(feeRecipient, feeAmount);
        }
        _payout(recipient, netAmount);

        emit Released(recipient, netAmount, feeAmount);
    }

    function dispute() external inStatus(Status.Open) whenNotPaused {
        require(tier >= 2, "EscrowV2: dispute tier");
        require(msg.sender == payer || msg.sender == recipient, "EscrowV2: not party");
        require(block.timestamp < holdUntil, "EscrowV2: hold passed");
        status = Status.Disputed;
        emit Disputed(msg.sender);
    }

    function resolveDispute(
        uint256 payerShare,
        uint256 recipientShare
    ) external nonReentrant onlyFactory inStatus(Status.Disputed) whenNotPaused {
        require(payerShare + recipientShare == amount, "EscrowV2: shares mismatch");

        status = Status.Resolved;

        if (payerShare > 0) {
            _payout(payer, payerShare);
        }
        if (recipientShare > 0) {
            _payout(recipient, recipientShare);
        }

        emit DisputeResolved(payerShare, recipientShare);
    }

    // ----------------------------------------------------------------------
    // Admin (via factory)
    // ----------------------------------------------------------------------

    function pause() external onlyFactory {
        _pause();
    }

    function unpause() external onlyFactory {
        _unpause();
    }

    // ----------------------------------------------------------------------
    // Helpers
    // ----------------------------------------------------------------------

    function _applyFee(uint256 value) internal view returns (uint256 feeAmount, uint256 netAmount) {
        if (feeRecipient == address(0) || feeBps == 0) {
            return (0, value);
        }
        feeAmount = (value * feeBps) / 10_000;
        netAmount = value - feeAmount;
    }

    function _payout(address to, uint256 value) internal {
        if (token == address(0)) {
            (bool ok, ) = payable(to).call{value: value}("");
            require(ok, "EscrowV2: native send fail");
        } else {
            require(
                IEscrowToken(token).transfer(to, value),
                "EscrowV2: token transfer fail"
            );
        }
    }

    // View helper for UI
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
 * @title EscrowFactoryV2
 * @notice Deploys EscrowV2 contracts and manages global settings (pause, fees).
 */
contract EscrowFactoryV2 is EscrowPausable {
    event NewEscrow(
        address indexed escrow,
        address indexed payer,
        address indexed recipient,
        address token,
        uint256 amount,
        uint256 holdUntil,
        uint8 tier,
        uint16 feeBps
    );
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event PauseStatusChanged(bool paused);
    event FeeConfigUpdated(address indexed feeRecipient, uint16 feeBps);

    address public owner;

    // Global time constraints
    uint256 public constant MIN_HOLD_TIME = 1 hours;
    uint256 public constant MAX_HOLD_TIME = 365 days;
    uint256 public constant SAFESEND_HOLD_TIME = 72 hours;

    // Global protocol fee config (bps out of 10_000)
    address public feeRecipient;
    uint16 public feeBps; // e.g. 10 = 0.10%, 25 = 0.25%

    modifier onlyOwner() { require(msg.sender == owner, "EscrowFactoryV2: not owner"); _; }

    constructor(address _owner) {
        require(_owner != address(0), "EscrowFactoryV2: zero owner");
        owner = _owner;
        emit OwnershipTransferred(address(0), _owner);
    }

    // ----------------------------------------------------------------------
    // Admin
    // ----------------------------------------------------------------------

    function setPaused(bool p) external onlyOwner {
        if (p) _pause(); else _unpause();
        emit PauseStatusChanged(p);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "EscrowFactoryV2: zero newOwner");
        address oldOwner = owner;
        owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }

    function setFeeConfig(address recipient, uint16 bps) external onlyOwner {
        if (bps > 0) {
            require(recipient != address(0), "EscrowFactoryV2: zero feeRecipient");
        }
        feeRecipient = recipient;
        feeBps = bps;
        emit FeeConfigUpdated(recipient, bps);
    }

    // ----------------------------------------------------------------------
    // Escrow creation & control
    // ----------------------------------------------------------------------

    function createEscrow(
        address recipient,
        address token,
        uint256 amount,
        uint256 holdSeconds,
        uint8   tier
    ) external payable whenNotPaused returns (address) {
        require(recipient != address(0), "EscrowFactoryV2: zero recipient");
        require(amount > 0, "EscrowFactoryV2: zero amount");

        if (tier > 0) {
            require(holdSeconds >= MIN_HOLD_TIME, "EscrowFactoryV2: hold too short");
        }
        require(holdSeconds <= MAX_HOLD_TIME, "EscrowFactoryV2: hold too long");

        EscrowV2 newEscrow;

        if (token == address(0)) {
            require(msg.value == amount, "EscrowFactoryV2: native mismatch");
            newEscrow = new EscrowV2{value: msg.value}(
                msg.sender,
                recipient,
                token,
                amount,
                holdSeconds,
                tier,
                feeRecipient,
                feeBps
            );
        } else {
            require(msg.value == 0, "EscrowFactoryV2: no native with token");
            newEscrow = new EscrowV2(
                msg.sender,
                recipient,
                token,
                amount,
                holdSeconds,
                tier,
                feeRecipient,
                feeBps
            );
            require(
                IEscrowToken(token).transfer(address(newEscrow), amount),
                "EscrowFactoryV2: token transfer fail"
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
            tier,
            feeBps
        );

        return escrowAddress;
    }

    function resolveDispute(
        address payable escrowAddress,
        uint256 payerShare,
        uint256 recipientShare
    ) external onlyOwner {
        EscrowV2(escrowAddress).resolveDispute(payerShare, recipientShare);
    }

    function pauseEscrow(address payable escrowAddress) external onlyOwner {
        EscrowV2(escrowAddress).pause();
    }

    function unpauseEscrow(address payable escrowAddress) external onlyOwner {
        EscrowV2(escrowAddress).unpause();
    }

    function getSafeSendHoldTime() external pure returns (uint256) {
        return SAFESEND_HOLD_TIME;
    }
}
