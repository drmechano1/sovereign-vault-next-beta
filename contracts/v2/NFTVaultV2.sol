// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface INameNFTV2 {
    function ownerOf(uint256 tokenId) external view returns (address);
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
}

/**
 * @title NFTVaultV2
 * @notice Identity Vault for Sovereign Vault v2
 * @dev Responsibilities:
 * - Custody of a single name NFT (from NameNFTV2).
 * - Guardian-based protection with multi-approval + 24h delay for transfers.
 * - Authorized wallets for day-to-day use without moving the identity NFT.
 * - Freeze / unfreeze controls for emergencies.
 *
 * This is the ID vault, not the money vault.
 */
contract NFTVaultV2 {
    // ----------------------------------------------------------------------
    // Events
    // ----------------------------------------------------------------------

    event VaultInitialized(address indexed nameNft, uint256 indexed tokenId);
    event WalletAuthorized(address indexed wallet, address indexed by);
    event WalletDeauthorized(address indexed wallet, address indexed by);
    event GuardianAdded(address indexed guardian, address indexed by);
    event GuardianRemoved(address indexed guardian, address indexed by);
    event TransferInitiated(bytes32 indexed opId, address indexed to, uint256 executeAfter);
    event TransferApproved(bytes32 indexed opId, address indexed guardian);
    event TransferExecuted(bytes32 indexed opId, address indexed to, uint256 indexed tokenId);
    event TransferCancelled(bytes32 indexed opId);
    event Frozen(address indexed by);
    event Unfrozen(address indexed by);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    // ----------------------------------------------------------------------
    // Storage
    // ----------------------------------------------------------------------

    INameNFTV2 public nameNft;
    uint256 public nameTokenId;
    bool public isInitialized;

    address public owner;
    bool public isFrozen;

    address[] private _guardians;
    mapping(address => bool) public isGuardian;
    uint256 public requiredGuardianApprovals;

    mapping(address => bool) public authorizedWallets;

    uint256 public constant TRANSFER_DELAY = 24 hours;

    struct PendingTransfer {
        bytes32 opId;
        address to;
        uint256 executeAfter;
        bool exists;
        bool executed;
    }

    PendingTransfer public pendingTransfer;

    mapping(bytes32 => mapping(address => bool)) public guardianApprovals;
    mapping(bytes32 => uint256) public approvalCount;

    uint256 private _opNonce;
    uint256 private _locked = 1;

    // ----------------------------------------------------------------------
    // Modifiers
    // ----------------------------------------------------------------------

    modifier onlyOwner() {
        require(msg.sender == owner, "NFTVaultV2: not owner");
        _;
    }

    modifier onlyGuardian() {
        require(isGuardian[msg.sender], "NFTVaultV2: not guardian");
        _;
    }

    modifier whenNotFrozen() {
        require(!isFrozen, "NFTVaultV2: frozen");
        _;
    }

    modifier vaultInitialized() {
        require(isInitialized, "NFTVaultV2: not initialized");
        _;
    }

    modifier nonReentrant() {
        require(_locked == 1, "NFTVaultV2: reentrant");
        _locked = 2;
        _;
        _locked = 1;
    }

    // ----------------------------------------------------------------------
    // Constructor
    // ----------------------------------------------------------------------

    /**
     * @param initialOwner Owner of this vault (user's main identity address or controller)
     * @param guardians Initial guardian set
     * @param requiredApprovals Number of guardian approvals needed for transfer
     */
    constructor(
        address initialOwner,
        address[] memory guardians,
        uint256 requiredApprovals
    ) {
        require(initialOwner != address(0), "NFTVaultV2: zero owner");
        require(guardians.length > 0, "NFTVaultV2: no guardians");
        require(
            requiredApprovals > 0 && requiredApprovals <= guardians.length,
            "NFTVaultV2: bad approvals"
        );

        owner = initialOwner;
        requiredGuardianApprovals = requiredApprovals;

        for (uint256 i = 0; i < guardians.length; i++) {
            address g = guardians[i];
            require(g != address(0), "NFTVaultV2: zero guardian");
            require(!isGuardian[g], "NFTVaultV2: duplicate guardian");
            isGuardian[g] = true;
            _guardians.push(g);
            emit GuardianAdded(g, initialOwner);
        }

        emit OwnershipTransferred(address(0), initialOwner);
    }

    // ----------------------------------------------------------------------
    // Ownership
    // ----------------------------------------------------------------------

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "NFTVaultV2: zero newOwner");
        address prev = owner;
        owner = newOwner;
        emit OwnershipTransferred(prev, newOwner);
    }

    // ----------------------------------------------------------------------
    // Initialization
    // ----------------------------------------------------------------------

    /**
     * @notice Initialize vault with the @name NFT
     * @param _nameNft Address of NameNFTV2 contract
     * @param _tokenId Token ID of the name NFT to deposit
     *
     * Caller must own the token before this call; the NFT is transferred into the vault.
     */
    function initialize(address _nameNft, uint256 _tokenId)
        external
        onlyOwner
        whenNotFrozen
    {
        require(!isInitialized, "NFTVaultV2: already initialized");
        require(_nameNft != address(0), "NFTVaultV2: zero nameNft");

        nameNft = INameNFTV2(_nameNft);
        nameTokenId = _tokenId;

        require(nameNft.ownerOf(_tokenId) == msg.sender, "NFTVaultV2: not token owner");

        // Move NFT into the vault
        nameNft.safeTransferFrom(msg.sender, address(this), _tokenId);

        isInitialized = true;

        emit VaultInitialized(_nameNft, _tokenId);
    }

    // ----------------------------------------------------------------------
    // Authorized wallets
    // ----------------------------------------------------------------------

    function authorizeWallet(address wallet) external onlyOwner whenNotFrozen {
        require(wallet != address(0), "NFTVaultV2: zero wallet");
        require(!authorizedWallets[wallet], "NFTVaultV2: already authorized");
        authorizedWallets[wallet] = true;
        emit WalletAuthorized(wallet, msg.sender);
    }

    function deauthorizeWallet(address wallet) external onlyOwner whenNotFrozen {
        require(authorizedWallets[wallet], "NFTVaultV2: not authorized");
        authorizedWallets[wallet] = false;
        emit WalletDeauthorized(wallet, msg.sender);
    }

    function isAuthorized(address wallet) external view returns (bool) {
        return authorizedWallets[wallet];
    }

    // ----------------------------------------------------------------------
    // Guardians
    // ----------------------------------------------------------------------

    function getGuardians() external view returns (address[] memory) {
        return _guardians;
    }

    function addGuardian(address guardian) external onlyOwner whenNotFrozen {
        require(guardian != address(0), "NFTVaultV2: zero guardian");
        require(!isGuardian[guardian], "NFTVaultV2: already guardian");
        isGuardian[guardian] = true;
        _guardians.push(guardian);
        emit GuardianAdded(guardian, msg.sender);
    }

    function removeGuardian(address guardian) external onlyOwner whenNotFrozen {
        require(isGuardian[guardian], "NFTVaultV2: not guardian");
        require(
            _guardians.length - 1 >= requiredGuardianApprovals,
            "NFTVaultV2: would break approvals"
        );

        isGuardian[guardian] = false;

        uint256 len = _guardians.length;
        for (uint256 i = 0; i < len; i++) {
            if (_guardians[i] == guardian) {
                _guardians[i] = _guardians[len - 1];
                _guardians.pop();
                break;
            }
        }

        emit GuardianRemoved(guardian, msg.sender);
    }

    function setRequiredGuardianApprovals(uint256 newRequired) external onlyOwner whenNotFrozen {
        require(newRequired > 0, "NFTVaultV2: zero approvals");
        require(newRequired <= _guardians.length, "NFTVaultV2: too many approvals");
        requiredGuardianApprovals = newRequired;
    }

    // ----------------------------------------------------------------------
    // Transfer workflow (guardian + time-locked)
    // ----------------------------------------------------------------------

    function initiateTransfer(address to)
        external
        onlyOwner
        vaultInitialized
        whenNotFrozen
    {
        require(to != address(0), "NFTVaultV2: zero to");
        require(
            !pendingTransfer.exists || pendingTransfer.executed,
            "NFTVaultV2: transfer pending"
        );

        _opNonce += 1;
        bytes32 opId = keccak256(abi.encodePacked(address(this), _opNonce, "TRANSFER"));

        pendingTransfer = PendingTransfer({
            opId: opId,
            to: to,
            executeAfter: block.timestamp + TRANSFER_DELAY,
            exists: true,
            executed: false
        });

        emit TransferInitiated(opId, to, pendingTransfer.executeAfter);
    }

    function approveTransfer()
        external
        onlyGuardian
        vaultInitialized
        whenNotFrozen
    {
        require(pendingTransfer.exists, "NFTVaultV2: no pending transfer");
        require(!pendingTransfer.executed, "NFTVaultV2: already executed");

        bytes32 opId = pendingTransfer.opId;

        require(!guardianApprovals[opId][msg.sender], "NFTVaultV2: already approved");
        guardianApprovals[opId][msg.sender] = true;
        approvalCount[opId] += 1;

        emit TransferApproved(opId, msg.sender);
    }

    function executeTransfer()
        external
        onlyOwner
        vaultInitialized
        whenNotFrozen
        nonReentrant
    {
        require(pendingTransfer.exists, "NFTVaultV2: no pending transfer");
        require(!pendingTransfer.executed, "NFTVaultV2: already executed");
        require(block.timestamp >= pendingTransfer.executeAfter, "NFTVaultV2: too early");

        bytes32 opId = pendingTransfer.opId;
        require(
            approvalCount[opId] >= requiredGuardianApprovals,
            "NFTVaultV2: insufficient approvals"
        );

        pendingTransfer.executed = true;
        address to = pendingTransfer.to;

        nameNft.safeTransferFrom(address(this), to, nameTokenId);

        emit TransferExecuted(opId, to, nameTokenId);
    }

    function cancelTransfer() external onlyOwner whenNotFrozen {
        require(pendingTransfer.exists, "NFTVaultV2: no pending transfer");
        require(!pendingTransfer.executed, "NFTVaultV2: already executed");

        bytes32 opId = pendingTransfer.opId;

        delete pendingTransfer;
        approvalCount[opId] = 0;

        emit TransferCancelled(opId);
    }

    // ----------------------------------------------------------------------
    // Emergency controls
    // ----------------------------------------------------------------------

    function freeze() external {
        require(msg.sender == owner || isGuardian[msg.sender], "NFTVaultV2: not allowed");
        require(!isFrozen, "NFTVaultV2: already frozen");
        isFrozen = true;
        emit Frozen(msg.sender);
    }

    function unfreeze() external onlyOwner {
        require(isFrozen, "NFTVaultV2: not frozen");
        isFrozen = false;
        emit Unfrozen(msg.sender);
    }

    // ----------------------------------------------------------------------
    // Views
    // ----------------------------------------------------------------------

    function getNFTOwner() external view vaultInitialized returns (address) {
        return nameNft.ownerOf(nameTokenId);
    }
}
