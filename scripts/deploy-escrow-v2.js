const hre = require("hardhat");

async function main() {
  console.log("Deploying EscrowFactoryV2 to", hre.network.name);

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Constructor parameters for EscrowFactoryV2
  const owner = deployer.address; // Factory owner

  const EscrowFactoryV2 = await hre.ethers.getContractFactory("EscrowFactoryV2");
  const escrowFactory = await EscrowFactoryV2.deploy(owner);

  await escrowFactory.waitForDeployment();

  const address = await escrowFactory.getAddress();
  console.log("EscrowFactoryV2 deployed to:", address);
  console.log("Owner:", owner);
  console.log("SafeSend hold time:", "72 hours");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
