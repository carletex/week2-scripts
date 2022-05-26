import "dotenv/config";
import { BigNumber, ethers } from "ethers";

// const wallet = ethers.Wallet.createRandom();
//
// console.log("address:", wallet.address);
// console.log("private key:", wallet.privateKey);
// console.log("mnemonic:", wallet.mnemonic.phrase);
//
// let path, myWallet;
//
// for (let i = 0; i < 10; i++) {
//   path = `m/44'/60'/0'/0/${i}`;
//   myWallet = ethers.Wallet.fromMnemonic(wallet.mnemonic.phrase, path);
//   console.log("address", i, myWallet.address);
//   console.log("private key", i, myWallet.privateKey);
// }

const rinkebyInfuraUrl = `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`;
const mainnetInfuraUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`;
const rinkebyProvider = new ethers.providers.JsonRpcProvider(rinkebyInfuraUrl);
const mainnetProvider = new ethers.providers.JsonRpcProvider(mainnetInfuraUrl);

const signer = new ethers.Wallet(
  process.env.MY_WALLET_PRIVATE_KEY,
  rinkebyProvider
);
const myBalance = await rinkebyProvider.getBalance(signer.address);

console.log("Rinkeby balance", ethers.utils.formatEther(myBalance));

const sandfordAddress = await mainnetProvider.resolveName("sanfordstout.eth");

console.log("Sending ETH to", sandfordAddress);

const tx = await signer.sendTransaction({
  to: sandfordAddress,
  value: myBalance.div(BigNumber.from(10)),
});

console.log("TX SENT!", tx);

await tx.wait();

console.log("TX CONFIRMED!");

// const signature = await wallet.signMessage("Hola!");
// console.log("Signed message", signature);
//
// //
// const signerAddress = ethers.utils.verifyMessage("Hola!", signature);
// console.log("signerAddress", signerAddress);
