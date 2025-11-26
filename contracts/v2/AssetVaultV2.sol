// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AssetVaultV2
 * @notice "Money Vault" for Sovereign Vault v2
 *
 * - Holds high-value assets: native (MATIC/ETH) and ERC-20 tokens.
 * - Non-custodial: owned by a user identity (EOA, NFTVaultV2, or controller).
 * - All withdrawals and strategy allocations are gated by a controller contract.
 * - Strategies are whitelisted adapters (e.g. Aave, LSTs, LPs).
 * - Includes a small configurable protocol fee on withdrawals.
 */

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

/**
 * @dev Minimal interface for strategy adapters.
 * Strategies encapsulate protocol-specific logic (Aave, LPs, etc.).
 */
interface IStrategyAdapter {
    function deposit(address token, uint256 amount) external payable;
    function withdraw(address token, uint256 amount, address to) external;
    function balanceOf(address token, address account) external view returns (uint256);
}

contract AssetVaultV2 {
    // ----------------------------------------------------------------------
    // Events
    // ----------------------------------------------------------------------

    event ControllerUpdated(address indexed oldController, address indexed newController);
    event StrategyWhitelisted(address indexed strategy, bool allowed);
    event DepositNative(address indexed from, uint256 amount);
    event DepositToken(address indexed token, address indexed from, uint256 amount);
    event WithdrawNative(address indexed to, uint256 netAmount, uint256 feeAmount);
    event WithdrawToken(address indexed token, address indexed to, uint256 netAmount, uint256 feeAmount);
    event AllocateToStrategy(address indexed strategy, address indexed token, uint256 amount);
    event RecallFromStrategy(address indexed strategy, address indexed token, uint256 amount);
    event FeeConfigUpdated(address indexed feeRecipient, uint16 feeBps);

    // ----------------------------------------------------------------------
    // Storage
    // ----------------------------------------------------------------------

    address public owner;       // Owner of this vault (identity / NFTVaultV2 / controller).
    address public controller;  // Policy controller contract.

    // Whitelisted strategy adapters
    mapping(address => bool) public whitelistedStrategies;

    // Protocol fee config (bps out of 10_000)
    address public feeRecipient;
    uint16 public feeBps; // e.g. 25 = 0.25%, 100 = 1%

    // Simple reentrancy guard
    uint256 private _locked = 1;

    // ----------------------------------------------------------------------
    // Modifiers
    // ----------------------------------------------------------------------

    modifier onlyOwner() {
        require(msg.sender == owner, "AV2: not owner");
        _;
    }

    modifier onlyController() {
        require(msg.sender == controller, "AV2: not controller");
        _;
    }

    modifier nonReentrant() {
        require(_locked == 1, "AV2: reentrant");
        _locked = 2;
        _;
        _locked = 1;
    }

    // ----------------------------------------------------------------------
    // Constructor
    // ----------------------------------------------------------------------

    /**
     * @param _owner The owner of the vault (user identity / NFTVaultV2 / controller).
     * @param _controller Initial controller contract (can be address(0) and set later).
     */
    constructor(address _owner, address _controller) {
        require(_owner != address(0), "AV2: zero owner");
        owner = _owner;
        controller = _controller;
    }

    // ----------------------------------------------------------------------
    // Administration
    // ----------------------------------------------------------------------

    /**
     * @notice Update the controller contract.
     * @dev Only the vault owner can change the controller reference.
     */
    function setController(address newController) external onlyOwner {
        emit ControllerUpdated(controller, newController);
        controller = newController;
    }

    /**
     * @notice Whitelist or de-whitelist a strategy adapter.
     * @dev Only owner can manage strategies. Controller will use them.
     */
    function setStrategyWhitelisted(address strategy, bool allowed) external onlyOwner {
        require(strategy != address(0), "AV2: zero strategy");
        whitelistedStrategies[strategy] = allowed;
        emit StrategyWhitelisted(strategy, allowed);
    }

    /**
     * @notice Configure protocol fee for withdrawals.
     * @param recipient Address that receives protocol fees (can be a treasury).
     * @param bps Fee in basis points (out of 10_000). Example: 25 = 0.25%.
     *
     * @dev Can be set to 0 bps to effectively disable fees.
     */
    function setFeeConfig(address recipient, uint16 bps) external onlyOwner {
        if (bps > 0) {
            require(recipient != address(0), "AV2: zero feeRecipient");
        }
        feeRecipient = recipient;
        feeBps = bps;
        emit FeeConfigUpdated(recipient, bps);
    }

    // ----------------------------------------------------------------------
    // Internal fee helper
    // ----------------------------------------------------------------------

    function _applyFee(uint256 amount) internal view returns (uint256 feeAmount, uint256 netAmount) {
        if (feeRecipient == address(0) || feeBps == 0) {
            return (0, amount);
        }
        feeAmount = (amount * feeBps) / 10_000;
        netAmount = amount - feeAmount;
    }

    // ----------------------------------------------------------------------
    // Deposits
    // ----------------------------------------------------------------------

    function depositNative() external payable nonReentrant {
        require(msg.value > 0, "AV2: zero amount");
        emit DepositNative(msg.sender, msg.value);
    }

    function depositToken(address token, uint256 amount) external nonReentrant {
        require(token != address(0), "AV2: zero token");
        require(amount > 0, "AV2: zero amount");

        require(
            IERC20(token).transferFrom(msg.sender, address(this), amount),
            "AV2: transferFrom failed"
        );

        emit DepositToken(token, msg.sender, amount);
    }

    // ----------------------------------------------------------------------
    // Withdrawals (controller-gated, with fee)
    // ----------------------------------------------------------------------

    function withdrawNative(address payable to, uint256 amount)
        external
        nonReentrant
        onlyController
    {
        require(to != address(0), "AV2: zero to");
        require(amount > 0, "AV2: zero amount");

        (uint256 feeAmount, uint256 netAmount) = _applyFee(amount);

        if (feeAmount > 0) {
            (bool feeOk, ) = feeRecipient.call{value: feeAmount}("");
            require(feeOk, "AV2: fee transfer failed");
        }

        (bool ok, ) = to.call{value: netAmount}("");
        require(ok, "AV2: native transfer failed");

        emit WithdrawNative(to, netAmount, feeAmount);
    }

    function withdrawToken(address token, address to, uint256 amount)
        external
        nonReentrant
        onlyController
    {
        require(token != address(0), "AV2: zero token");
        require(to != address(0), "AV2: zero to");
        require(amount > 0, "AV2: zero amount");

        (uint256 feeAmount, uint256 netAmount) = _applyFee(amount);

        if (feeAmount > 0) {
            require(
                IERC20(token).transfer(feeRecipient, feeAmount),
                "AV2: fee token transfer failed"
            );
        }

        require(
            IERC20(token).transfer(to, netAmount),
            "AV2: token transfer failed"
        );

        emit WithdrawToken(token, to, netAmount, feeAmount);
    }

    // ----------------------------------------------------------------------
    // Strategy allocation (yield / DeFi access)
    // ----------------------------------------------------------------------

    function allocateToStrategy(address strategy, address token, uint256 amount)
        external
        nonReentrant
        onlyController
    {
        require(whitelistedStrategies[strategy], "AV2: strategy not allowed");
        require(amount > 0, "AV2: zero amount");

        if (token == address(0)) {
            IStrategyAdapter(strategy).deposit{value: amount}(token, amount);
        } else {
            require(
                IERC20(token).transfer(strategy, amount),
                "AV2: token transfer to strategy failed"
            );
            IStrategyAdapter(strategy).deposit(token, amount);
        }

        emit AllocateToStrategy(strategy, token, amount);
    }

    function recallFromStrategy(address strategy, address token, uint256 amount)
        external
        nonReentrant
        onlyController
    {
        require(whitelistedStrategies[strategy], "AV2: strategy not allowed");
        require(amount > 0, "AV2: zero amount");

        IStrategyAdapter(strategy).withdraw(token, amount, address(this));

        emit RecallFromStrategy(strategy, token, amount);
    }

    // ----------------------------------------------------------------------
    // Views
    // ----------------------------------------------------------------------

    function nativeBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function tokenBalance(address token) external view returns (uint256) {
        return IERC20(token).balanceOf(address(this));
    }

    function strategyBalance(address strategy, address token) external view returns (uint256) {
        return IStrategyAdapter(strategy).balanceOf(token, address(this));
    }

    // ----------------------------------------------------------------------
    // Fallback
    // ----------------------------------------------------------------------

    receive() external payable {
        // Allow receiving native from strategies or direct sends.
        // Use depositNative() for explicit user deposits.
    }
}
