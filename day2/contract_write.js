import { ethers } from "ethers";
import { getSigner } from "./utils.js";
import sandfordNFTAbi from "./abi/sanfordNFTAbi.js";

const sanfordNFTAddress = "0x6E2756D5A4780c4d26De0A91f0c0AF5CE77cBC34";
const rinkebySigner = getSigner();

const sanfordContract = new ethers.Contract(
  sanfordNFTAddress,
  sandfordNFTAbi,
  rinkebySigner
);

const mintPrice = await sanfordContract.MINT_PRICE();

console.log("SanfordStout mint price", ethers.utils.formatEther(mintPrice));

console.log("Minting NFT!");

const mintTx = await sanfordContract.mint({
  value: mintPrice,
});

console.log("TX sent", mintTx.hash);

await mintTx.wait();

console.log("TX mined!");
