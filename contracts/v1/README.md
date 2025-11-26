# Sovereign Vault v1 Contracts

This folder contains the production Solidity contracts deployed on Polygon mainnet as of November 8, 2025.

## Contract Files

### ✅ Available Contracts

| File | Original Source | Deployed Address | Status |
|------|----------------|------------------|--------|
| `NameNFT.sol` | `SovereignVaultNames.sol` | `0x4fE567616584Ab01a716606d009336a7c0398397` | ✅ Verified |
| `CrossChainNames.sol` | `CrossChainNames.sol` | Multiple (see below) | ✅ Verified |
| `EscrowFactory.sol` | `EscrowFactory_Standalone.sol` | `0x29aBFc89126722B9d190Fe980E2D528Cf0bFA800` | ✅ Verified |
| `NFTVault.sol` | `NFTVault.sol` | `0xfad63B409570Da25DBa89633FD782a9DAFfD58CD` | ✅ Verified |

### ❌ Missing Contracts

The following contracts are referenced in the deployment but source code is **not available**:

- **WalletCore** (`0x8a60312eE35590666d198e610D39794D414D4d89`)
  - Status: Address exists on Polygonscan but no verified source code
  - No transactions found at this address
  
- **GuardianModule** (`0x71A97890d985a1e3A1679DaC80f33064a1aD7b3c`)
  - Status: Address exists on Polygonscan but no verified source code
  - No transactions found at this address

- **WalletFactory**
  - Status: Address unknown, source code not available

## CrossChainNames.sol Contracts

The `CrossChainNames.sol` file contains **two contracts**:

1. **NameRegistry** (`0x3eF0d0067899f4AB31D9D93B5FB6E4976762F0ca`)
   - Central registry for @name → address mappings
   - Supports multi-chain address resolution
   - Handles @name registration and ownership

2. **PaymentRouter** (`0xcCB7488462EbdbE18AfD0ac04B76921b8A1aa357`)
   - Routes cross-chain payments using @names
   - Integrates with NameRegistry for address resolution

## Deployment Info

- **Network**: Polygon PoS Chain (Chain ID: 137)
- **Deployer**: `0xf0CE0738bb6BE16c482024c82F9903C4de2965C6`
- **Deployment Date**: November 8, 2025
- **Source**: `sovereign-vault-backup` repository

## Configuration

Contract addresses and metadata are centralized in:
```
config/contracts.polygon.json
```

## Next Steps

1. ❌ **Locate WalletCore and GuardianModule source code**
   - Check other repositories
   - Check local development environments
   - Contact original developers

2. ⚠️ **Verify deployment status**
   - WalletCore and GuardianModule addresses show no transactions
   - May not be actually deployed despite being in documentation

3. ✅ **Use available contracts**
   - NameNFT, NameRegistry, PaymentRouter, EscrowFactory, and NFTVault are ready to use
   - These contracts form the core @name system

## Important Notes

- **Do not modify these files** - they represent the actual deployed contracts
- Any changes require new deployments with new addresses
- Always test on Amoy testnet before mainnet deployment
- Full technical documentation available under NDA
