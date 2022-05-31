import { ethers } from "ethers";
import { getProvider, getSigner } from "./utils.js";
import daiAbi from "./abi/daiAbi.js";

const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

const mainnetProvider = getProvider(true);
const mainnetSigner = getSigner(true);

const daiContract = new ethers.Contract(
  daiAddress,
  daiAbi,
  mainnetProvider
);

const daiContractWrite = new ethers.Contract(
  daiAddress,
  daiAbi,
  mainnetSigner
);

const myAddress = "0x94Ca5a56b568Ca741cc0e9e8Ff91Bb6cb78cFab7";
const sandfordAddress = await mainnetProvider.resolveName("sanfordstout.eth");

const daiBalance = await daiContract.balanceOf(myAddress);
console.log("Dai balance", ethers.utils.formatEther(daiBalance));
console.log("Sending dai to", sandfordAddress);

const daiTransfer = await daiContractWrite.transfer(sandfordAddress, ethers.utils.parseEther("5"));

console.log("TX SENT!", daiTransfer.hash);

await daiTransfer.wait();

console.log("TX MINED!");

const newDaiBalance = await daiContract.balanceOf(myAddress);
console.log("New Dai balance", ethers.utils.formatEther(newDaiBalance));


