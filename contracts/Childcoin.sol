// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Childcoin is ERC20 {
  
  constructor()ERC20('CDC','Child Coin'){
      _mint(msg.sender, 3500*10**18);  
  }

}