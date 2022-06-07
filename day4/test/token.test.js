const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token", function () {
  let token;
  beforeEach(async () => {
    const Token = await ethers.getContractFactory("SanfordToken");
    token = await Token.deploy();
    await token.deployed();
  });

  it("Should be able to create tokens", async function () {
    const [signer0] = await ethers.getSigners();

    const createTx = await token.create(100);
    await createTx.wait();

    expect(await token.balances(signer0.address)).to.equal(100);
  });

  it("Should revert if a non-boss tries to create tokens", async function () {
    const [signer0, signer1] = await ethers.getSigners();

    const createTx = token.connect(signer1).create(1);

    await expect(createTx).to.be.reverted;
  });

  it("Should revert if creating more than total supply", async function () {
    const totalSupply = await token.totalSupply();

    const createTx = token.create(totalSupply.add(100));

    await expect(createTx).to.be.reverted;
  });

  it("Should be able to send tokens", async function () {
    const [signer0, signer1] = await ethers.getSigners();

    const createTx = await token.create(100);
    await createTx.wait();

    expect(await token.balances(signer0.address)).to.equal(100);

    const sendTx = await token.send(signer1.address, 25);
    await sendTx.wait();

    expect(await token.balances(signer0.address)).to.equal(75);
    expect(await token.balances(signer1.address)).to.equal(25);
  });

  it("Should allow a rando to buy some tokens", async function () {
    const [signer0, signer1] = await ethers.getSigners();

    const buyTx = await token.connect(signer1).buy({
      value: ethers.utils.parseEther("0.01"),
    });
    await buyTx.wait();

    expect(await token.balances(signer1.address)).to.equal(1);
  });
});
