// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NFTVault
 * @notice Secure vault for storing @name.sov NFTs with guardian protection
 * @dev This contract holds the user's @name NFT and authorizes operating wallets
 *      to transact on behalf of the NFT owner. Provides maximum security by
 *      separating NFT custody from daily transaction operations.
 * 
 * Security Features:
 * - NFT locked in vault, cannot be stolen
 * - Guardian approval required for NFT transfers
 * - Time-locked transfers (24-hour delay)
 * - Multiple operating wallets can be authorized
 * - Emergency freeze functionality
 * - Event logging for all actions
 * 
 * @author Sovereign Vault
 */
contract NFTVault is ReentrancyGuard, Ownable {
    
    // ============ State Variables ============
    
    /// @notice The NFT contract address (SovereignVaultNames)
    IERC721 public nftContract;
    
    /// @notice The token ID of the @name NFT stored in this vault
    uint256 public nftTokenId;
    
    /// @notice Whether the vault has been initialized with an NFT
    bool public isInitialized;
    
    /// @notice Whether the vault is frozen (emergency stop)
    bool public isFrozen;
    
    /// @notice List of guardian addresses
    address[] public guardians;
    
    /// @notice Number of guardian approvals required for sensitive operations
    uint256 public requiredGuardianApprovals;
    
    /// @notice Mapping of authorized operating wallets
    mapping(address => bool) public authorizedWallets;
    
    /// @notice Mapping of guardian approvals for pending operations
    mapping(bytes32 => mapping(address => bool)) public guardianApprovals;
    
    /// @notice Mapping of guardian approvals count for pending operations
    mapping(bytes32 => uint256) public approvalCount;
    
    /// @notice Pending NFT transfer details
    struct PendingTransfer {
        address to;
        uint256 executeAfter; // Timestamp when transfer can be executed
        bool exists;
        bool executed;
    }
    
    /// @notice Current pending NFT transfer
    PendingTransfer public pendingTransfer;
    
    /// @notice Time delay for NFT transfers (24 hours)
    uint256 public constant TRANSFER_DELAY = 24 hours;
    
    // ============ Events ============
    
    event VaultInitialized(address indexed nftContract, uint256 indexed tokenId);
    event WalletAuthorized(address indexed wallet, address indexed authorizer);
    event WalletDeauthorized(address indexed wallet, address indexed authorizer);
    event GuardianAdded(address indexed guardian, address indexed addedBy);
    event GuardianRemoved(address indexed guardian, address indexed removedBy);
    event TransferInitiated(address indexed to, uint256 executeAfter);
    event TransferApproved(address indexed guardian, bytes32 indexed operationId);
    event TransferExecuted(address indexed to, uint256 indexed tokenId);
    event TransferCancelled(bytes32 indexed operationId);
    event VaultFrozen(address indexed freezer);
    event VaultUnfrozen(address indexed unfreezer);
    event EmergencyWithdraw(address indexed to, uint256 indexed tokenId);
    
    // ============ Modifiers ============
    
    modifier whenNotFrozen() {
        require(!isFrozen, "Vault is frozen");
        _;
    }
    
    modifier onlyGuardian() {
        require(isGuardian(msg.sender), "Not a guardian");
        _;
    }
    
    modifier vaultInitialized() {
        require(isInitialized, "Vault not initialized");
        _;
    }
    
    // ============ Constructor ============
    
    /**
     * @notice Creates a new NFT vault
     * @param _owner The owner of the vault (user's primary address)
     * @param _guardians Array of guardian addresses
     * @param _requiredApprovals Number of guardian approvals needed (typically 2)
     */
    constructor(
        address _owner,
        address[] memory _guardians,
        uint256 _requiredApprovals
    ) Ownable(_owner) {
        require(_guardians.length >= _requiredApprovals, "Not enough guardians");
        require(_requiredApprovals > 0, "Need at least 1 approval");
        
        guardians = _guardians;
        requiredGuardianApprovals = _requiredApprovals;
        
        for (uint256 i = 0; i < _guardians.length; i++) {
            require(_guardians[i] != address(0), "Invalid guardian address");
            emit GuardianAdded(_guardians[i], msg.sender);
        }
    }
    
    // ============ Initialization ============
    
    /**
     * @notice Initialize the vault by depositing the @name NFT
     * @param _nftContract Address of the SovereignVaultNames NFT contract
     * @param _tokenId Token ID of the @name NFT to deposit
     * @dev Can only be called once. NFT must be owned by the caller.
     */
    function initialize(
        address _nftContract,
        uint256 _tokenId
    ) external onlyOwner {
        require(!isInitialized, "Already initialized");
        require(_nftContract != address(0), "Invalid NFT contract");
        
        nftContract = IERC721(_nftContract);
        nftTokenId = _tokenId;
        
        // Transfer NFT from owner to vault
        nftContract.transferFrom(msg.sender, address(this), _tokenId);
        
        isInitialized = true;
        
        emit VaultInitialized(_nftContract, _tokenId);
    }
    
    // ============ Operating Wallet Management ============
    
    /**
     * @notice Authorize a wallet to transact using this vault's NFT
     * @param wallet Address of the operating wallet to authorize
     * @dev Only owner can authorize wallets. This is the wallet that will
     *      be used for daily transactions while the NFT stays safe in the vault.
     */
    function authorizeWallet(address wallet) external onlyOwner whenNotFrozen {
        require(wallet != address(0), "Invalid wallet address");
        require(!authorizedWallets[wallet], "Wallet already authorized");
        
        authorizedWallets[wallet] = true;
        
        emit WalletAuthorized(wallet, msg.sender);
    }
    
    /**
     * @notice Revoke authorization for a wallet
     * @param wallet Address of the wallet to deauthorize
     */
    function deauthorizeWallet(address wallet) external onlyOwner whenNotFrozen {
        require(authorizedWallets[wallet], "Wallet not authorized");
        
        authorizedWallets[wallet] = false;
        
        emit WalletDeauthorized(wallet, msg.sender);
    }
    
    /**
     * @notice Check if a wallet is authorized by this vault
     * @param wallet Address to check
     * @return bool True if wallet is authorized
     * @dev This is called by PaymentRouter to verify transaction authorization
     */
    function isAuthorized(address wallet) external view returns (bool) {
        return authorizedWallets[wallet];
    }
    
    // ============ Guardian Management ============
    
    /**
     * @notice Add a new guardian
     * @param guardian Address of the guardian to add
     */
    function addGuardian(address guardian) external onlyOwner whenNotFrozen {
        require(guardian != address(0), "Invalid guardian address");
        require(!isGuardian(guardian), "Already a guardian");
        
        guardians.push(guardian);
        
        emit GuardianAdded(guardian, msg.sender);
    }
    
    /**
     * @notice Remove a guardian
     * @param guardian Address of the guardian to remove
     */
    function removeGuardian(address guardian) external onlyOwner whenNotFrozen {
        require(isGuardian(guardian), "Not a guardian");
        require(guardians.length - 1 >= requiredGuardianApprovals, "Would leave too few guardians");
        
        // Find and remove guardian
        for (uint256 i = 0; i < guardians.length; i++) {
            if (guardians[i] == guardian) {
                guardians[i] = guardians[guardians.length - 1];
                guardians.pop();
                break;
            }
        }
        
        emit GuardianRemoved(guardian, msg.sender);
    }
    
    /**
     * @notice Check if an address is a guardian
     * @param addr Address to check
     * @return bool True if address is a guardian
     */
    function isGuardian(address addr) public view returns (bool) {
        for (uint256 i = 0; i < guardians.length; i++) {
            if (guardians[i] == addr) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * @notice Get all guardians
     * @return address[] Array of guardian addresses
     */
    function getGuardians() external view returns (address[] memory) {
        return guardians;
    }
    
    // ============ NFT Transfer (Guardian-Protected) ============
    
    /**
     * @notice Initiate transfer of NFT to a new address
     * @param to Address to transfer NFT to
     * @dev Starts a time-locked transfer that requires guardian approval.
     *      Used for recovery scenarios or moving to a new vault.
     */
    function initiateTransfer(address to) external onlyOwner vaultInitialized whenNotFrozen {
        require(to != address(0), "Invalid recipient");
        require(!pendingTransfer.exists || pendingTransfer.executed, "Transfer already pending");
        
        pendingTransfer = PendingTransfer({
            to: to,
            executeAfter: block.timestamp + TRANSFER_DELAY,
            exists: true,
            executed: false
        });
        
        emit TransferInitiated(to, pendingTransfer.executeAfter);
    }
    
    /**
     * @notice Guardian approves the pending NFT transfer
     * @dev Guardians review and approve the transfer. Once enough approvals
     *      are collected and time delay has passed, transfer can be executed.
     */
    function approveTransfer() external onlyGuardian vaultInitialized whenNotFrozen {
        require(pendingTransfer.exists, "No pending transfer");
        require(!pendingTransfer.executed, "Transfer already executed");
        
        bytes32 operationId = keccak256(abi.encodePacked("TRANSFER", pendingTransfer.to, pendingTransfer.executeAfter));
        
        require(!guardianApprovals[operationId][msg.sender], "Already approved");
        
        guardianApprovals[operationId][msg.sender] = true;
        approvalCount[operationId]++;
        
        emit TransferApproved(msg.sender, operationId);
    }
    
    /**
     * @notice Execute the pending NFT transfer after approvals and time delay
     * @dev Can be called by owner once guardian approvals are met and time delay passed
     */
    function executeTransfer() external onlyOwner vaultInitialized whenNotFrozen nonReentrant {
        require(pendingTransfer.exists, "No pending transfer");
        require(!pendingTransfer.executed, "Transfer already executed");
        require(block.timestamp >= pendingTransfer.executeAfter, "Time delay not passed");
        
        bytes32 operationId = keccak256(abi.encodePacked("TRANSFER", pendingTransfer.to, pendingTransfer.executeAfter));
        
        require(approvalCount[operationId] >= requiredGuardianApprovals, "Not enough guardian approvals");
        
        address recipient = pendingTransfer.to;
        pendingTransfer.executed = true;
        
        // Transfer NFT to recipient
        nftContract.transferFrom(address(this), recipient, nftTokenId);
        
        emit TransferExecuted(recipient, nftTokenId);
    }
    
    /**
     * @notice Cancel a pending NFT transfer
     * @dev Owner can cancel at any time before execution
     */
    function cancelTransfer() external onlyOwner {
        require(pendingTransfer.exists, "No pending transfer");
        require(!pendingTransfer.executed, "Transfer already executed");
        
        bytes32 operationId = keccak256(abi.encodePacked("TRANSFER", pendingTransfer.to, pendingTransfer.executeAfter));
        
        delete pendingTransfer;
        delete approvalCount[operationId];
        
        emit TransferCancelled(operationId);
    }
    
    // ============ Emergency Functions ============
    
    /**
     * @notice Freeze the vault in case of emergency
     * @dev Can be called by owner or any guardian. Prevents all operations.
     */
    function freeze() external {
        require(msg.sender == owner() || isGuardian(msg.sender), "Not authorized");
        require(!isFrozen, "Already frozen");
        
        isFrozen = true;
        
        emit VaultFrozen(msg.sender);
    }
    
    /**
     * @notice Unfreeze the vault
     * @dev Only owner can unfreeze
     */
    function unfreeze() external onlyOwner {
        require(isFrozen, "Not frozen");
        
        isFrozen = false;
        
        emit VaultUnfrozen(msg.sender);
    }
    
    /**
     * @notice Emergency withdraw NFT with guardian approval
     * @param to Address to send NFT to
     * @dev Used in extreme emergencies. Requires all guardians to approve.
     *      Bypasses time delay but requires unanimous guardian consent.
     */
    function emergencyWithdraw(address to) external onlyOwner vaultInitialized nonReentrant {
        require(to != address(0), "Invalid recipient");
        
        bytes32 operationId = keccak256(abi.encodePacked("EMERGENCY", to, block.timestamp));
        
        // Require ALL guardians to approve emergency withdrawal
        require(approvalCount[operationId] == guardians.length, "Need all guardian approvals");
        
        // Transfer NFT
        nftContract.transferFrom(address(this), to, nftTokenId);
        
        emit EmergencyWithdraw(to, nftTokenId);
    }
    
    /**
     * @notice Guardian approves emergency withdrawal
     */
    function approveEmergencyWithdraw(address to) external onlyGuardian vaultInitialized {
        bytes32 operationId = keccak256(abi.encodePacked("EMERGENCY", to, block.timestamp));
        
        require(!guardianApprovals[operationId][msg.sender], "Already approved");
        
        guardianApprovals[operationId][msg.sender] = true;
        approvalCount[operationId]++;
        
        emit TransferApproved(msg.sender, operationId);
    }
    
    // ============ View Functions ============
    
    /**
     * @notice Get the current NFT owner (should be this vault)
     * @return address Owner of the NFT
     */
    function getNFTOwner() external view vaultInitialized returns (address) {
        return nftContract.ownerOf(nftTokenId);
    }
    
    /**
     * @notice Get pending transfer details
     * @return to Recipient address
     * @return executeAfter Timestamp when transfer can be executed
     * @return exists Whether a transfer is pending
     * @return executed Whether the transfer has been executed
     */
    function getPendingTransfer() external view returns (
        address to,
        uint256 executeAfter,
        bool exists,
        bool executed
    ) {
        return (
            pendingTransfer.to,
            pendingTransfer.executeAfter,
            pendingTransfer.exists,
            pendingTransfer.executed
        );
    }
    
    /**
     * @notice Get approval count for a specific operation
     * @param operationId Hash of the operation
     * @return uint256 Number of guardian approvals
     */
    function getApprovalCount(bytes32 operationId) external view returns (uint256) {
        return approvalCount[operationId];
    }
    
    /**
     * @notice Check if guardian has approved an operation
     * @param operationId Hash of the operation
     * @param guardian Address of the guardian
     * @return bool True if guardian has approved
     */
    function hasApproved(bytes32 operationId, address guardian) external view returns (bool) {
        return guardianApprovals[operationId][guardian];
    }
}

