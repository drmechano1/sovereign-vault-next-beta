const hre = require("hardhat");

async function main() {
  console.log("Deploying NFTVaultV2 to", hre.network.name);

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Constructor parameters for NFTVaultV2
  // You'll need to provide the deployed NameNFTV2 address
  const nameNFTAddress = process.env.NAME_NFT_V2_ADDRESS || "0x0000000000000000000000000000000000000000";
  
  if (nameNFTAddress === "0x0000000000000000000000000000000000000000") {
    console.warn("WARNING: Using zero address for NameNFT. Set NAME_NFT_V2_ADDRESS in .env");
  }

  const NFTVaultV2 = await hre.ethers.getContractFactory("NFTVaultV2");
  const nftVault = await NFTVaultV2.deploy(nameNFTAddress);

  await nftVault.waitForDeployment();

  const address = await nftVault.getAddress();
  console.log("NFTVaultV2 deployed to:", address);
  console.log("NameNFT address:", nameNFTAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
