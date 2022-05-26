import { BigNumber, ethers } from "ethers";
import { getProvider, getSigner } from "./utils.js";

const mainnetProvider = getProvider(true);
const rinkebySigner = getSigner();

const myBalance = await rinkebySigner.getBalance();

console.log("My balance", ethers.utils.formatEther(myBalance));

const sandfordAddress = await mainnetProvider.resolveName("sanfordstout.eth");

console.log("Sending ETH to", sandfordAddress);

const tx = await rinkebySigner.sendTransaction({
  to: sandfordAddress,
  value: myBalance.div(BigNumber.from(10)),
});

console.log("TX SENT!", tx.hash);

await tx.wait();

console.log("TX MINED!");
