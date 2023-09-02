// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SanforStoutNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public tokenIdCounter;

    uint256 public TOTAL_SUPPLY = 100;
    uint256 public MINT_PRICE = 0.01 ether;

    constructor() ERC721("Sanford Stout NFT", "SSN") {}

    function _baseURI() internal pure virtual override returns (string memory) {
        return
            "ipfs://bafybeicce4ku2pode3f5keremouq3t4nmhrqh3yg6ptzjbkntb357z4jry/";
    }

    function mint() external payable {
        require(msg.value >= MINT_PRICE, "Insufficient ETH amount");
        require(
            tokenIdCounter.current() < TOTAL_SUPPLY,
            "Reached total supply"
        );
        tokenIdCounter.increment();

        uint256 tokenId = tokenIdCounter.current();
        _mint(msg.sender, tokenId);
    }

    function ownerMint(address to) external onlyOwner {
        require(
            tokenIdCounter.current() < TOTAL_SUPPLY,
            "Reached total supply"
        );
        tokenIdCounter.increment();

        uint256 tokenId = tokenIdCounter.current();
        _mint(to, tokenId);
    }

    function withdraw(address _to, uint _amount) external onlyOwner {
        require(
            address(this).balance >= _amount,
            "No enough ETH in the contract"
        );
        (bool success, ) = _to.call{value: _amount}("");
        require(success, "Failed to send Ether");
    }
}
