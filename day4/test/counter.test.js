const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Counter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const [signer0] = await ethers.getSigners();

    console.log("deploying contract as", signer0.address);
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy(10);
    await counter.deployed();

    expect(await counter.count()).to.equal(10);

    const incTx = await counter.inc();
    await incTx.wait();

    expect(await counter.count()).to.equal(11);

    expect(await counter.boss()).to.equal(signer0.address);
  });

  it("Should return the new greeting once it's changed", async function () {
    const [signer0, signer1] = await ethers.getSigners();

    console.log("deploying contract as", signer0.address);
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy(10);
    await counter.deployed();

    const decTx = await counter.connect(signer1).dec();
  });
});
