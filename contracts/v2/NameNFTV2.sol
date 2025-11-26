// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title NameNFTV2
 * @notice ERC-721 NFT for @names with namespace support (e.g. "dan" + "sov").
 *
 * Each NFT represents a unique (namespace, label) pair:
 *   - label: "dan"
 *   - namespace: "sov"
 * Combined logical handle: "dan.sov"
 *
 * Features:
 * - Uniqueness enforced per (namespace, label)
 * - Simple validation (lowercase a-z, 0-9, -, _)
 * - Flat registration fee per mint (configurable)
 * - Fee recipient (treasury) configurable by owner
 * - Owner can withdraw accumulated fees
 */
contract NameNFTV2 is ERC721, Ownable, ReentrancyGuard {
    using Strings for uint256;

    // ----------------------------------------------------------------------
    // Data structures
    // ----------------------------------------------------------------------

    struct NameData {
        string label;        // e.g. "dan"
        string namespace;    // e.g. "sov"
        uint64 registeredAt; // timestamp
    }

    // tokenId => NameData
    mapping(uint256 => NameData) private _names;

    // keccak256(namespace, ":", label) => tokenId
    mapping(bytes32 => uint256) private _nameHashToTokenId;

    // Simple incremental token id
    uint256 private _nextTokenId;

    // Base URI for metadata
    string private _baseTokenURI;

    // Fee config
    uint256 public registrationFee; // flat fee in wei per name mint
    address public feeRecipient;    // treasury address

    // ----------------------------------------------------------------------
    // Events
    // ----------------------------------------------------------------------

    event NameRegistered(
        uint256 indexed tokenId,
        string indexed namespace,
        string indexed label,
        address owner,
        uint256 fee
    );

    event FeeConfigUpdated(address indexed feeRecipient, uint256 registrationFee);
    event FeesWithdrawn(address indexed to, uint256 amount);

    // ----------------------------------------------------------------------
    // Constructor
    // ----------------------------------------------------------------------

    /**
     * @param initialBaseURI Base URI for token metadata (can be empty)
     * @param initialRegistrationFee Flat fee per registration (e.g. 0.001 ether)
     */
    constructor(
        string memory initialBaseURI,
        uint256 initialRegistrationFee
    ) ERC721("Sovereign Vault Name V2", "SVNAME2") Ownable(msg.sender) {
        _baseTokenURI = initialBaseURI;
        registrationFee = initialRegistrationFee;
        feeRecipient = msg.sender; // default to deployer; can be updated
        emit FeeConfigUpdated(feeRecipient, registrationFee);
    }

    // ----------------------------------------------------------------------
    // Public mint API
    // ----------------------------------------------------------------------

    /**
     * @notice Register a new @name under a given namespace.
     * @param label The name label, e.g. "dan"
     * @param namespace The namespace, e.g. "sov"
     * @param to Address that will receive the NFT
     *
     * Requirements:
     * - (namespace, label) must not already be registered
     * - label and namespace must be valid and non-empty
     * - msg.value must equal registrationFee (if > 0)
     */
    function registerName(
        string calldata label,
        string calldata namespace,
        address to
    ) external payable nonReentrant returns (uint256 tokenId) {
        require(to != address(0), "NameNFTV2: zero address");
        require(_isValidPart(label), "NameNFTV2: invalid label");
        require(_isValidPart(namespace), "NameNFTV2: invalid namespace");

        require(isNameAvailable(label, namespace), "NameNFTV2: name taken");

        if (registrationFee > 0) {
            require(msg.value == registrationFee, "NameNFTV2: incorrect fee");
        } else {
            require(msg.value == 0, "NameNFTV2: no fee required");
        }

        // Effects
        tokenId = ++_nextTokenId;

        _names[tokenId] = NameData({
            label: label,
            namespace: namespace,
            registeredAt: uint64(block.timestamp)
        });

        bytes32 nameHash = _computeNameHash(label, namespace);
        _nameHashToTokenId[nameHash] = tokenId;

        _safeMint(to, tokenId);

        emit NameRegistered(tokenId, namespace, label, to, msg.value);
    }

    // ----------------------------------------------------------------------
    // Fee configuration
    // ----------------------------------------------------------------------

    /**
     * @notice Update fee recipient and registration fee.
     * @param newRecipient Treasury or protocol wallet to receive fees
     * @param newFee Flat registration fee in wei (can be 0)
     *
     * If newFee is 0, newRecipient can be zero as well, meaning "no fees".
     */
    function setFeeConfig(address newRecipient, uint256 newFee) external onlyOwner {
        if (newFee > 0) {
            require(newRecipient != address(0), "NameNFTV2: zero fee recipient");
        }
        feeRecipient = newRecipient;
        registrationFee = newFee;
        emit FeeConfigUpdated(newRecipient, newFee);
    }

    /**
     * @notice Withdraw accumulated ETH fees.
     * @dev Sends the full contract balance to feeRecipient.
     */
    function withdrawFees() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "NameNFTV2: no fees");
        address recipient = feeRecipient;
        require(recipient != address(0), "NameNFTV2: feeRecipient not set");

        (bool ok, ) = payable(recipient).call{value: balance}("");
        require(ok, "NameNFTV2: withdraw failed");

        emit FeesWithdrawn(recipient, balance);
    }

    // ----------------------------------------------------------------------
    // Views / helpers
    // ----------------------------------------------------------------------

    function isNameAvailable(
        string calldata label,
        string calldata namespace
    ) public view returns (bool) {
        bytes32 h = _computeNameHash(label, namespace);
        return _nameHashToTokenId[h] == 0;
    }

    function getTokenIdForName(
        string calldata label,
        string calldata namespace
    ) external view returns (uint256) {
        bytes32 h = _computeNameHash(label, namespace);
        return _nameHashToTokenId[h];
    }

    function getNameData(
        uint256 tokenId
    ) external view returns (string memory label, string memory namespace, uint64 registeredAt) {
        require(_ownerOf(tokenId) != address(0), "NameNFTV2: nonexistent token");
        NameData memory d = _names[tokenId];
        return (d.label, d.namespace, d.registeredAt);
    }

    function fullName(uint256 tokenId) external view returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "NameNFTV2: nonexistent token");
        NameData memory d = _names[tokenId];
        return string(abi.encodePacked(d.label, ".", d.namespace));
    }

    function totalMinted() external view returns (uint256) {
        return _nextTokenId;
    }

    // ----------------------------------------------------------------------
    // Internal helpers
    // ----------------------------------------------------------------------

    function _computeNameHash(
        string calldata label,
        string calldata namespace
    ) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(namespace, ":", label));
    }

    /**
     * @dev Simple validation: 1-32 chars, [a-z0-9_-]
     */
    function _isValidPart(string calldata part) internal pure returns (bool) {
        bytes memory b = bytes(part);
        if (b.length == 0 || b.length > 32) return false;

        for (uint256 i = 0; i < b.length; i++) {
            bytes1 c = b[i];
            bool ok =
                (c >= 0x61 && c <= 0x7A) || // a-z
                (c >= 0x30 && c <= 0x39) || // 0-9
                (c == 0x2D) ||              // '-'
                (c == 0x5F);                // '_'
            if (!ok) return false;
        }
        return true;
    }

    // ----------------------------------------------------------------------
    // Metadata
    // ----------------------------------------------------------------------

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function setBaseURI(string calldata newBaseURI) external onlyOwner {
        _baseTokenURI = newBaseURI;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "NameNFTV2: nonexistent token");
        string memory base = _baseURI();
        if (bytes(base).length == 0) {
            return "";
        }
        return string(abi.encodePacked(base, tokenId.toString()));
    }

    // ----------------------------------------------------------------------
    // Fallback
    // ----------------------------------------------------------------------

    receive() external payable {
        // Accept direct sends (e.g. dust), but fees should come via registerName().
    }
}
