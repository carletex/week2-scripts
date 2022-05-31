// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { ethers } = require("ethers");

async function main() {
  const localProviderUrl = "http://127.0.0.1:8545/";
  const provider = new ethers.providers.JsonRpcProvider(localProviderUrl);

  const account0Address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const account0Balance = await provider.getBalance(account0Address);
  console.log("account0Balance", ethers.utils.formatEther(account0Balance));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
