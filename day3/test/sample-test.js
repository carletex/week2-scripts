const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  let greeter;
  beforeEach(async () => {
    const Greeter = await ethers.getContractFactory("Greeter");
    greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();
  });

  it("Should revert if the contract is not unlocked", async function () {
    await expect(greeter.setGreeting("Hola, mundo!")).to.be.reverted;
  });

  it("Should return the new greeting once it's changed (and it's unlocked)", async function () {
    expect(await greeter.greet()).to.equal("Hello, world!");

    const unlockTx = await greeter.toggleUnlocked();
    await unlockTx.wait();

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
