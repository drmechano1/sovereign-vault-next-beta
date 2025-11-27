# V2 Contract Deployment Scripts

## Prerequisites

1. Create a `.env` file in the project root with your Amoy testnet private key:
   ```
   PRIVATE_KEY=0x...
   ```

2. Ensure you have MATIC on Polygon Amoy testnet for gas fees.
   - Get testnet MATIC from: https://faucet.polygon.technology/

## Deployment Order

Deploy contracts in this order to satisfy dependencies:

### 1. Deploy NameNFTV2
```bash
npx hardhat run scripts/deploy-name-nft-v2.js --network amoy
```
- This deploys the @name NFT contract
- Copy the deployed address for the next step

### 2. Deploy NFTVaultV2
```bash
# Add the NameNFTV2 address to your .env:
# NAME_NFT_V2_ADDRESS=0x...

npx hardhat run scripts/deploy-nft-vault-v2.js --network amoy
```
- This deploys the identity vault with guardian protection

### 3. Deploy AssetVaultV2
```bash
npx hardhat run scripts/deploy-asset-vault-v2.js --network amoy
```
- This deploys the money vault with protocol fees

### 4. Deploy EscrowFactoryV2
```bash
npx hardhat run scripts/deploy-escrow-v2.js --network amoy
```
- This deploys the SafeSend escrow factory

## After Deployment

1. Save all deployed addresses to `config/contracts.amoy.json`
2. Verify contracts on Polygonscan Amoy:
   ```bash
   npx hardhat verify --network amoy <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
   ```

## Security Notes

- ⚠️ **NEVER commit your `.env` file** - it contains your private key
- ⚠️ The `.env` file is already in `.gitignore`
- ⚠️ Use a dedicated testnet wallet, not your mainnet wallet
- ⚠️ For mainnet deployment, use a hardware wallet or secure key management system

## Network Configuration

The Hardhat config includes:
- **Amoy Testnet**: Chain ID 80002, RPC: https://rpc-amoy.polygon.technology
- Private key loaded from `process.env.PRIVATE_KEY`
