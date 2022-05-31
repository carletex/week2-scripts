// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { ethers, BigNumber } = require("ethers");

async function main() {
  const hardhatSigner = (await hre.ethers.getSigners())[0];

  const myBalance = await hardhatSigner.getBalance();

  console.log("My balance", ethers.utils.formatEther(myBalance));

  const toAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

  console.log("Sending ETH to", toAddress);

  const tx = await hardhatSigner.sendTransaction({
    to: toAddress,
    value: myBalance.div(BigNumber.from(10)),
  });

  console.log("TX SENT!", tx.hash);

  await tx.wait();

  console.log("TX MINED!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
