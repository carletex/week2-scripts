// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { ethers, BigNumber } = require("ethers");

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const greeter = await hre.ethers.getContractAt("Greeter", contractAddress);

  console.log("Initial greeting", await greeter.greet());

  console.log("Setting greeting....");
  const setTx = await greeter.setGreeting("Is this working??");

  console.log("setTx sent!");

  await setTx.wait();

  console.log("setTx mined!");

  console.log("New greeting!", await greeter.greet());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
