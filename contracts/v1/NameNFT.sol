// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title SovereignVaultNames - Production Security Hardened
 * @dev NFT contract for @name registration on Sovereign Vault
 * Security features:
 * - Reentrancy protection
 * - Proper checks-effects-interactions pattern
 * - Input validation
 * - Access control
 */
contract SovereignVaultNames {
    
    struct NameInfo {
        address nameOwner;
        uint256 tokenId;
        string metadataURI;
        uint256 registeredAt;
    }
    
    // State variables
    uint256 private _tokenIdCounter;
    mapping(string => NameInfo) public registeredNames;
    mapping(uint256 => string) public tokenIdToName;
    mapping(address => string[]) public ownerToNames;
    
    uint256 public platformFee = 0.01 ether; // 0.01 MATIC
    address public contractOwner;
    
    // Reentrancy guard
    bool private locked;
    
    // Events
    event NameRegistered(string indexed nameString, address indexed owner, uint256 tokenId, uint256 price);
    event PlatformFeeUpdated(uint256 newFee);
    event Withdrawal(address indexed owner, uint256 amount);
    
    constructor() {
        contractOwner = msg.sender;
        locked = false;
    }
    
    modifier onlyOwner() {
        require(msg.sender == contractOwner, "Not contract owner");
        _;
    }
    
    modifier noReentrant() {
        require(!locked, "No reentrancy");
        locked = true;
        _;
        locked = false;
    }
    
    /**
     * @dev Register a new @name as NFT
     * @param nameString The @name to register (without @ symbol)
     * @param metadataURI IPFS URI for NFT metadata
     */
    function registerName(string memory nameString, string memory metadataURI) public payable noReentrant returns (uint256) {
        // Checks
        require(bytes(nameString).length > 0, "Name cannot be empty");
        require(bytes(nameString).length <= 32, "Name too long");
        require(registeredNames[nameString].nameOwner == address(0), "Name already registered");
        require(msg.value >= platformFee, "Insufficient payment");
        
        // Effects
        _tokenIdCounter++;
        uint256 newTokenId = _tokenIdCounter;
        
        registeredNames[nameString] = NameInfo({
            nameOwner: msg.sender,
            tokenId: newTokenId,
            metadataURI: metadataURI,
            registeredAt: block.timestamp
        });
        
        tokenIdToName[newTokenId] = nameString;
        ownerToNames[msg.sender].push(nameString);
        
        emit NameRegistered(nameString, msg.sender, newTokenId, msg.value);
        
        // No external interactions after state changes
        return newTokenId;
    }
    
    /**
     * @dev Check if a name is available for registration
     */
    function isNameAvailable(string memory nameString) public view returns (bool) {
        return registeredNames[nameString].nameOwner == address(0);
    }
    
    /**
     * @dev Get information about a registered name
     */
    function getNameInfo(string memory nameString) public view returns (
        address owner,
        uint256 tokenId,
        string memory metadataURI,
        uint256 registeredAt
    ) {
        NameInfo memory info = registeredNames[nameString];
        require(info.nameOwner != address(0), "Name not registered");
        return (info.nameOwner, info.tokenId, info.metadataURI, info.registeredAt);
    }
    
    /**
     * @dev Get the name associated with a token ID
     */
    function getNameByTokenId(uint256 tokenId) public view returns (string memory) {
        require(tokenId > 0 && tokenId <= _tokenIdCounter, "Invalid token ID");
        string memory nameString = tokenIdToName[tokenId];
        require(bytes(nameString).length > 0, "Token does not exist");
        return nameString;
    }
    
    /**
     * @dev Get all names owned by an address
     */
    function getNamesOwnedBy(address owner) public view returns (string[] memory) {
        return ownerToNames[owner];
    }
    
    /**
     * @dev Get the owner of a name
     */
    function getNameOwner(string memory nameString) public view returns (address) {
        address owner = registeredNames[nameString].nameOwner;
        require(owner != address(0), "Name not registered");
        return owner;
    }
    
    /**
     * @dev Update platform fee (only owner)
     */
    function setPlatformFee(uint256 newFee) public onlyOwner {
        require(newFee <= 1 ether, "Fee too high"); // Max 1 MATIC
        platformFee = newFee;
        emit PlatformFeeUpdated(newFee);
    }
    
    /**
     * @dev Withdraw collected fees (only owner)
     * Follows checks-effects-interactions pattern to prevent reentrancy
     */
    function withdraw() public onlyOwner noReentrant {
        // Checks
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        // Effects (none needed here, but pattern is important)
        
        // Interactions (external call last)
        (bool success, ) = payable(contractOwner).call{value: balance}("");
        require(success, "Transfer failed");
        
        emit Withdrawal(contractOwner, balance);
    }
    
    /**
     * @dev Get total number of registered names
     */
    function getTotalNames() public view returns (uint256) {
        return _tokenIdCounter;
    }
    
    /**
     * @dev Get contract balance
     */
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
    
    /**
     * @dev Emergency function to transfer ownership
     */
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid address");
        contractOwner = newOwner;
    }
}