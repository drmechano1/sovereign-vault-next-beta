// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

/**
 * @title Cross-Chain @Name System
 * @notice Complete system in one file for easy Remix deployment
 * @dev Includes NameRegistry and PaymentRouter
 */

// ============================================================================
// NAME REGISTRY
// ============================================================================

contract NameRegistry {
    
    struct NameRecord {
        address owner;
        uint256 registeredAt;
        uint256 expiresAt;
        bool active;
    }
    
    mapping(string => NameRecord) public names;
    mapping(string => mapping(uint256 => address)) public chainAddresses;
    mapping(address => string[]) public ownerNames;
    
    uint256 public registrationFee = 0.001 ether;
    address public protocolOwner;
    address public feeRecipient;
    
    event NameRegistered(string indexed name, address indexed owner, uint256 timestamp);
    event AddressSet(string indexed name, uint256 indexed chainId, address addr);
    event NameTransferred(string indexed name, address indexed from, address indexed to);
    
    modifier onlyNameOwner(string calldata name) {
        require(names[name].owner == msg.sender, "Not name owner");
        _;
    }
    
    modifier onlyProtocolOwner() {
        require(msg.sender == protocolOwner, "Not protocol owner");
        _;
    }
    
    constructor() {
        protocolOwner = msg.sender;
        feeRecipient = msg.sender;
    }
    
    function register(string calldata name) external payable {
        require(bytes(name).length > 0 && bytes(name).length <= 32, "Invalid length");
        require(!names[name].active, "Name taken");
        require(msg.value >= registrationFee, "Insufficient fee");
        require(_isValidName(name), "Invalid format");
        
        names[name] = NameRecord({
            owner: msg.sender,
            registeredAt: block.timestamp,
            expiresAt: 0,
            active: true
        });
        
        ownerNames[msg.sender].push(name);
        chainAddresses[name][block.chainid] = msg.sender;
        
        if (msg.value > 0) {
            (bool success, ) = feeRecipient.call{value: msg.value}("");
            require(success, "Fee transfer failed");
        }
        
        emit NameRegistered(name, msg.sender, block.timestamp);
        emit AddressSet(name, block.chainid, msg.sender);
    }
    
    function setAddress(string calldata name, uint256 chainId, address addr) 
        external onlyNameOwner(name) 
    {
        require(addr != address(0) && chainId > 0, "Invalid input");
        chainAddresses[name][chainId] = addr;
        emit AddressSet(name, chainId, addr);
    }
    
    function setAddresses(
        string calldata name,
        uint256[] calldata chainIds,
        address[] calldata addrs
    ) external onlyNameOwner(name) {
        require(chainIds.length == addrs.length && chainIds.length > 0, "Invalid input");
        
        for (uint256 i = 0; i < chainIds.length; i++) {
            require(addrs[i] != address(0) && chainIds[i] > 0, "Invalid data");
            chainAddresses[name][chainIds[i]] = addrs[i];
            emit AddressSet(name, chainIds[i], addrs[i]);
        }
    }
    
    function resolve(string calldata name) external view returns (address) {
        require(names[name].active, "Name not registered");
        address addr = chainAddresses[name][block.chainid];
        require(addr != address(0), "Address not set");
        return addr;
    }
    
    function resolveChain(string calldata name, uint256 chainId) 
        external view returns (address) 
    {
        require(names[name].active, "Name not registered");
        address addr = chainAddresses[name][chainId];
        require(addr != address(0), "Address not set");
        return addr;
    }
    
    function available(string calldata name) external view returns (bool) {
        return !names[name].active;
    }
    
    function transfer(string calldata name, address newOwner) 
        external onlyNameOwner(name) 
    {
        require(newOwner != address(0) && newOwner != names[name].owner, "Invalid owner");
        
        address oldOwner = names[name].owner;
        names[name].owner = newOwner;
        ownerNames[newOwner].push(name);
        
        emit NameTransferred(name, oldOwner, newOwner);
    }
    
    function getNamesOf(address owner) external view returns (string[] memory) {
        return ownerNames[owner];
    }
    
    function getRecord(string calldata name) external view returns (
        address owner,
        uint256 registeredAt,
        uint256 expiresAt,
        bool active
    ) {
        NameRecord memory record = names[name];
        return (record.owner, record.registeredAt, record.expiresAt, record.active);
    }
    
    function setRegistrationFee(uint256 newFee) external onlyProtocolOwner {
        registrationFee = newFee;
    }
    
    function setFeeRecipient(address newRecipient) external onlyProtocolOwner {
        require(newRecipient != address(0), "Zero address");
        feeRecipient = newRecipient;
    }
    
    function _isValidName(string calldata name) internal pure returns (bool) {
        bytes memory nameBytes = bytes(name);
        for (uint256 i = 0; i < nameBytes.length; i++) {
            bytes1 char = nameBytes[i];
            bool valid = (char >= 0x61 && char <= 0x7A) || // a-z
                        (char >= 0x30 && char <= 0x39) ||  // 0-9
                        (char == 0x5F) || (char == 0x2D);  // _ or -
            if (!valid) return false;
        }
        return true;
    }
}

// ============================================================================
// PAYMENT ROUTER
// ============================================================================

interface INameRegistry {
    function resolve(string calldata name) external view returns (address);
}

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

contract PaymentRouter {
    
    INameRegistry public immutable registry;
    uint256 public protocolFeeBps = 0;
    address public feeRecipient;
    address public owner;
    uint256 private _locked = 1;
    
    event PaymentSent(
        string indexed name,
        address indexed from,
        address indexed to,
        uint256 amount,
        uint256 fee
    );
    
    event TokenSent(
        string indexed name,
        address indexed from,
        address indexed to,
        address token,
        uint256 amount,
        uint256 fee
    );
    
    modifier nonReentrant() {
        require(_locked == 1, "Reentrant");
        _locked = 2;
        _;
        _locked = 1;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    constructor(address _registry) {
        require(_registry != address(0), "Zero address");
        registry = INameRegistry(_registry);
        owner = msg.sender;
        feeRecipient = msg.sender;
    }
    
    function sendTo(string calldata name) external payable nonReentrant {
        require(msg.value > 0, "Zero amount");
        
        address recipient = registry.resolve(name);
        require(recipient != address(0), "Not resolved");
        
        uint256 fee = 0;
        uint256 amountAfterFee = msg.value;
        
        if (protocolFeeBps > 0) {
            fee = (msg.value * protocolFeeBps) / 10000;
            amountAfterFee = msg.value - fee;
            
            if (fee > 0) {
                (bool feeSuccess, ) = feeRecipient.call{value: fee}("");
                require(feeSuccess, "Fee failed");
            }
        }
        
        (bool success, ) = recipient.call{value: amountAfterFee}("");
        require(success, "Transfer failed");
        
        emit PaymentSent(name, msg.sender, recipient, amountAfterFee, fee);
    }
    
    function sendTokenTo(string calldata name, address token, uint256 amount) 
        external nonReentrant 
    {
        require(amount > 0 && token != address(0), "Invalid input");
        
        address recipient = registry.resolve(name);
        require(recipient != address(0), "Not resolved");
        
        uint256 fee = 0;
        uint256 amountAfterFee = amount;
        
        if (protocolFeeBps > 0) {
            fee = (amount * protocolFeeBps) / 10000;
            amountAfterFee = amount - fee;
            
            if (fee > 0) {
                require(
                    IERC20(token).transferFrom(msg.sender, feeRecipient, fee),
                    "Fee failed"
                );
            }
        }
        
        require(
            IERC20(token).transferFrom(msg.sender, recipient, amountAfterFee),
            "Transfer failed"
        );
        
        emit TokenSent(name, msg.sender, recipient, token, amountAfterFee, fee);
    }
    
    function previewResolve(string calldata name) external view returns (address) {
        return registry.resolve(name);
    }
    
    function calculateFee(uint256 amount) external view returns (
        uint256 fee,
        uint256 amountAfterFee
    ) {
        if (protocolFeeBps > 0) {
            fee = (amount * protocolFeeBps) / 10000;
            amountAfterFee = amount - fee;
        } else {
            fee = 0;
            amountAfterFee = amount;
        }
    }
    
    function setProtocolFee(uint256 newFeeBps) external onlyOwner {
        require(newFeeBps <= 1000, "Fee too high");
        protocolFeeBps = newFeeBps;
    }
    
    function setFeeRecipient(address newRecipient) external onlyOwner {
        require(newRecipient != address(0), "Zero address");
        feeRecipient = newRecipient;
    }
    
    receive() external payable {}
}