const { ethers } = require("hardhat");

async function main(){
   
    const [deployer]=await ethers.getSigners();

    const Childcoin=await ethers.getContractFactory('Childcoin',deployer);

    const childcoin=await Childcoin.deploy();


    console.log("child coin deployed is",childcoin.address);
}


//child coin deployed is 0x8eaF7a5DbebD987Ad1459E289BD514794F64987C

main()
.then(()=>process.exit(0))
.catch((err)=>{
    console.log(err);
    process.exit(1);
})