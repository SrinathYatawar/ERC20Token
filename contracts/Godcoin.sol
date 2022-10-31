// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Godcoin is ERC20 {
  
  constructor()ERC20('GDC','God  Coin'){
      _mint(msg.sender, 2500*10**18);  
  }

}