require('@nomicfoundation/hardhat-toolbox');

/** @type import('hardhat/config').HardhatUserConfig */

module.exports={
  solidity:'0.8.11',
  networks:{
   goerli:{
     url:NETWORKPROVIDER,
     accounts:[ACCOUNTADDRESS],
   }
  }


};