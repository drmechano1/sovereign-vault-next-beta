// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NameNFTV2
 * @notice Canonical @name NFT for Sovereign Vault v2
 *
 * - Infinite supply: no maxSupply, we mint on demand.
 * - One unique NFT per (label, namespaceId) combination.
 * - On-chain label is strictly lowercase [a-z0-9_-]{1,32} for safety.
 * - displayName is for UI/branding (can have caps, etc.) but NOT used for uniqueness.
 *
 * Example:
 *  label        = "alpha"
 *  namespaceId  = 0        // default namespace (e.g. ".sov")
 *  displayName  = "Alpha"
 *
 * All routing and uniqueness are based on (label, namespaceId).
 */
contract NameNFTV2 is ERC721, Ownable {
    struct NameData {
        string label;        // canonical lowercase label: "alpha"
        uint8  namespaceId;  // 0 = default ".sov", future namespaces > 0
        string displayName;  // UI display: "Alpha", "ALPHA", etc.
    }

    // tokenId => NameData
    mapping(uint256 => NameData) private _names;

    // keccak256(namespaceId, label) => tokenId
    mapping(bytes32 => uint256) public nameHashToTokenId;

    // Incremental token counter
    uint256 private _nextTokenId;

    // Optional external minter (e.g. controller). If zero, only owner can mint.
    address public minter;

    event NameMinted(
        uint256 indexed tokenId,
        address indexed to,
        string label,
        uint8 namespaceId,
        string displayName
    );

    event DisplayNameUpdated(
        uint256 indexed tokenId,
        string oldDisplayName,
        string newDisplayName
    );

    event MinterUpdated(address indexed oldMinter, address indexed newMinter);

    constructor() ERC721("Sovereign Vault Name", "SVNAME") Ownable(msg.sender) {}

    modifier onlyMinterOrOwner() {
        if (minter != address(0)) {
            require(msg.sender == minter || msg.sender == owner(), "NameNFTV2: not minter/owner");
        } else {
            require(msg.sender == owner(), "NameNFTV2: minter not set, only owner");
        }
        _;
    }

    function setMinter(address newMinter) external onlyOwner {
        emit MinterUpdated(minter, newMinter);
        minter = newMinter;
    }

    function mintName(
        address to,
        string calldata label,
        uint8 namespaceId,
        string calldata displayName
    ) external onlyMinterOrOwner returns (uint256) {
        require(to != address(0), "NameNFTV2: zero address");
        _validateLabel(label);

        bytes32 nameHash = _computeNameHash(label, namespaceId);
        require(nameHashToTokenId[nameHash] == 0, "NameNFTV2: name already exists");

        _nextTokenId += 1;
        uint256 tokenId = _nextTokenId;

        _names[tokenId] = NameData({
            label: label,
            namespaceId: namespaceId,
            displayName: displayName
        });

        nameHashToTokenId[nameHash] = tokenId;

        _safeMint(to, tokenId);

        emit NameMinted(tokenId, to, label, namespaceId, displayName);
        return tokenId;
    }

    function setDisplayName(uint256 tokenId, string calldata newDisplayName) external {
        require(_ownerOf(tokenId) != address(0), "NameNFTV2: nonexistent token");
        require(_isAuthorized(_ownerOf(tokenId), msg.sender, tokenId), "NameNFTV2: not owner/approved");

        string memory old = _names[tokenId].displayName;
        _names[tokenId].displayName = newDisplayName;

        emit DisplayNameUpdated(tokenId, old, newDisplayName);
    }

    function getNameData(uint256 tokenId) external view returns (
        string memory label,
        uint8 namespaceId,
        string memory displayName
    ) {
        require(_ownerOf(tokenId) != address(0), "NameNFTV2: nonexistent token");
        NameData memory d = _names[tokenId];
        return (d.label, d.namespaceId, d.displayName);
    }

    function getTokenIdForName(string calldata label, uint8 namespaceId) external view returns (uint256) {
        bytes32 nameHash = _computeNameHash(label, namespaceId);
        return nameHashToTokenId[nameHash];
    }

    function getHandle(uint256 tokenId) external view returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "NameNFTV2: nonexistent token");
        NameData memory d = _names[tokenId];
        return string(abi.encodePacked("@", d.label));
    }

    function _computeNameHash(string memory label, uint8 namespaceId) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(namespaceId, label));
    }

    function _validateLabel(string calldata label) internal pure {
        bytes memory b = bytes(label);
        uint256 len = b.length;
        require(len > 0 && len <= 32, "NameNFTV2: invalid length");

        for (uint256 i = 0; i < len; i++) {
            bytes1 c = b[i];

            bool ok = (
                (c >= 0x61 && c <= 0x7A) || // a-z
                (c >= 0x30 && c <= 0x39) || // 0-9
                (c == 0x5F) ||              // _
                (c == 0x2D)                 // -
            );

            require(ok, "NameNFTV2: invalid character");
        }
    }
}
