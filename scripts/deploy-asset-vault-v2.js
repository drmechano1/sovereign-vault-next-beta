const hre = require("hardhat");

async function main() {
  console.log("Deploying AssetVaultV2 to", hre.network.name);

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Constructor parameters for AssetVaultV2
  const owner = deployer.address; // Vault owner
  const controller = hre.ethers.ZeroAddress; // Can be set later via setController()

  const AssetVaultV2 = await hre.ethers.getContractFactory("AssetVaultV2");
  const assetVault = await AssetVaultV2.deploy(owner, controller);

  await assetVault.waitForDeployment();

  const address = await assetVault.getAddress();
  console.log("AssetVaultV2 deployed to:", address);
  console.log("Owner:", owner);
  console.log("Controller:", controller === hre.ethers.ZeroAddress ? "Not set (can be configured later)" : controller);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
