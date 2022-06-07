// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Counter {
    uint256 public count;
    address public boss;

    constructor(uint256 _initialCount) {
        count = _initialCount;
        boss = msg.sender;
    }

    modifier onlyBoss() {
        require(msg.sender == boss, "Sorry, not the boss");
        _;
    }

    // Function to get the current count
    function get() public view returns (uint) {
        return count;
    }

    // Function to increment count by 1
    function inc() public {
        count += 1;
    }

    // Function to increment count by 1
    function superInc() public onlyBoss {
        count += 10;
    }

    function dec() public onlyBoss {
        count -= 1;
    }
}
