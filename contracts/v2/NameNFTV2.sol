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
    // ------------------------------------------------------------------------
    // Types & Storage
    // ------------------------------------------------------------------------

    struct NameData {
        string label;        // canonical lowercase label: "alpha"
        uint8  namespaceId;  // 0 = default ".sov", future namespaces > 0
        string displayName;  // UI display: "Alpha", "ALPHA", etc.
    }

    // tokenId => NameData
    mapping(uint256 => NameData) private _names;

    // keccak256(namespaceId, label) => tokenId
    mapping(bytes32 => uint256) public nameHashToTokenId;

    // Incremental token counter (starts at 0, we ++ before mint, so first is 1)
    uint256 private _nextTokenId;

    // Optional separate minter (e.g. controller contract). If zero, only owner can mint.
    address public minter;

    // ------------------------------------------------------------------------
    // Events
    // ------------------------------------------------------------------------

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

    // ------------------------------------------------------------------------
    // Constructor
    // ------------------------------------------------------------------------

    constructor() ERC721("Sovereign Vault Name", "SVNAME") Ownable(msg.sender) {}

    // ------------------------------------------------------------------------
    // Modifiers
    // ------------------------------------------------------------------------

    modifier onlyMinterOrOwner() {
        if (minter != address(0)) {
            require(msg.sender == minter || msg.sender == owner(), "NameNFTV2: not minter/owner");
        } else {
            require(msg.sender == owner(), "NameNFTV2: minter not set, only owner");
        }
        _;
    }

    // ------------------------------------------------------------------------
    // Admin
    // ------------------------------------------------------------------------

    /**
     * @notice Set the external minter (e.g. controller contract)
     */
    function setMinter(address newMinter) external onlyOwner {
        emit MinterUpdated(minter, newMinter);
        minter = newMinter;
    }

    // ------------------------------------------------------------------------
    // Minting
    // ------------------------------------------------------------------------

    /**
     * @notice Mint a new @name NFT
     * @param to Address receiving the NFT
     * @param label Canonical lowercase label: [a-z0-9_-]{1,32}
     * @param namespaceId Namespace identifier (0 = default, future expansion > 0)
     * @param displayName UI display form, can include caps/spaces/emojis as desired
     *
     * Requirements:
     * - label must be 1-32 chars
     * - label must be lowercase a-z, 0-9, '_' or '-'
     * - name (label + namespaceId) must not already be minted
     */
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

    // ------------------------------------------------------------------------
    // Updates
    // ------------------------------------------------------------------------

    /**
     * @notice Update the display name (UI-only) for a token
     * @dev Does NOT affect routing or uniqueness; purely cosmetic
     */
    function setDisplayName(uint256 tokenId, string calldata newDisplayName) external {
        require(_ownerOf(tokenId) != address(0), "NameNFTV2: nonexistent token");
        require(_isAuthorized(_ownerOf(tokenId), msg.sender, tokenId), "NameNFTV2: not owner/approved");

        string memory old = _names[tokenId].displayName;
        _names[tokenId].displayName = newDisplayName;

        emit DisplayNameUpdated(tokenId, old, newDisplayName);
    }

    // ------------------------------------------------------------------------
    // Views
    // ------------------------------------------------------------------------

    /**
     * @notice Get full name data for a tokenId
     */
    function getNameData(uint256 tokenId) external view returns (
        string memory label,
        uint8 namespaceId,
        string memory displayName
    ) {
        require(_ownerOf(tokenId) != address(0), "NameNFTV2: nonexistent token");
        NameData memory d = _names[tokenId];
        return (d.label, d.namespaceId, d.displayName);
    }

    /**
     * @notice Resolve (label, namespaceId) → tokenId, or 0 if not minted
     */
    function getTokenIdForName(string calldata label, uint8 namespaceId) external view returns (uint256) {
        bytes32 nameHash = _computeNameHash(label, namespaceId);
        return nameHashToTokenId[nameHash];
    }

    /**
     * @notice Convenience: get canonical full handle string for a token
     * e.g. "alpha" + namespaceId=0 => "@alpha"
     * Frontends can append suffixes like ".sov" based on namespaceId if desired.
     */
    function getHandle(uint256 tokenId) external view returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "NameNFTV2: nonexistent token");
        NameData memory d = _names[tokenId];
        // Just return "@label" here. Namespace-specific suffixes can be added off-chain.
        return string(abi.encodePacked("@", d.label));
    }

    // ------------------------------------------------------------------------
    // Internal helpers
    // ------------------------------------------------------------------------

    function _computeNameHash(string memory label, uint8 namespaceId) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(namespaceId, label));
    }

    /**
     * @dev Ensure label is 1-32 chars and only [a-z0-9_-]
     * NOTE: This assumes label is already lowercase. We do NOT lowercase on-chain
     * to avoid extra gas and logic surface. Frontend should normalize input.
     */
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
