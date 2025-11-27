const hre = require("hardhat");

async function main() {
  console.log("Deploying NameNFTV2 to", hre.network.name);

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Constructor parameters for NameNFTV2
  const initialBaseURI = ""; // Can be set later via setBaseURI()
  const initialRegistrationFee = hre.ethers.parseEther("0.001"); // 0.001 MATIC

  const NameNFTV2 = await hre.ethers.getContractFactory("NameNFTV2");
  const nameNFT = await NameNFTV2.deploy(initialBaseURI, initialRegistrationFee);

  await nameNFT.waitForDeployment();

  const address = await nameNFT.getAddress();
  console.log("NameNFTV2 deployed to:", address);
  console.log("Initial registration fee:", hre.ethers.formatEther(initialRegistrationFee), "MATIC");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
