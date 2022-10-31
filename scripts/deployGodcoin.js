const { ethers } = require("hardhat");

async function main(){
   
    const [deployer]=await ethers.getSigners();

    const Godcoin=await ethers.getContractFactory('Godcoin',deployer);

    const godcoin=await Godcoin.deploy();


    console.log("god coin deployed is",godcoin.address);
}

//god coin deployed is 0xD89Dff942731E6925dA86EB4f88130319651ef12

main()
.then(()=>process.exit(0))
.catch((err)=>{
    console.log(err);
    process.exit(1);
})