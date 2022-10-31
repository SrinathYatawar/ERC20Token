const {ethers}=require('ethers');

const {Token}=require('@uniswap/sdk-core');

const {Pool, Position, nearestUsableTick}=require('@uniswap/v3-sdk');

const { abi: IUniswapV3PoolABI } =require('@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json');

const { abi: INonfungiblePositionManagerABI } = require('@uniswap/v3-periphery/artifacts/contracts/interfaces/INonfungiblePositionManager.sol/INonfungiblePositionManager.json')

const ERC20ABI=require('./abi.json');

const NetworkProvider=new ethers.providers.JsonRpcProvider(NETWORKPROVIDER);

const PoolAddress='0x976AF6733Df601aFA50241b94e825cf7C71BE51F';

const NonFungablePositionManagerAddress='0xC36442b4a4522E871399CD717aBDD847Ab11FE88';


 //taking all the instances of God Coin;



const name0="God coin";
const symbol0="GDC";
const decimal0=18;
const address0='0xD89Dff942731E6925dA86EB4f88130319651ef12';


//taking all the instances of childccoin ;



const name1="Child coin";
const symbol1="CDC";
const decimal1=18;
const address1='0x8eaF7a5DbebD987Ad1459E289BD514794F64987C';



const chainId=5;

const TokenA=new Token(chainId,address0,decimal0,symbol0,name0);
const TokenB=new Token(chainId,address1,decimal1,symbol1,name1);

//provided with token while providing the liquidity;

const NonFungablePositionManagerContract=new ethers.Contract(
    NonFungablePositionManagerAddress,
    INonfungiblePositionManagerABI,
    NetworkProvider
)


const poolContract=new ethers.Contract(
    PoolAddress,
    IUniswapV3PoolABI,
    NetworkProvider
)


async function getPoolData(poolContract){
const [tickSpacing, fee, liquidity, slot0] = await Promise.all([
        poolContract.tickSpacing(),
        poolContract.fee(),
        poolContract.maxLiquidityPerTick(),
        poolContract.slot0(),
      ])
      
      return(
          { tickSpacing: tickSpacing,
           fee: fee,
          liquidity: liquidity,
          sqrtPriceX96:slot0[0],
          tick: slot0[1],
        }
      )
}


async function main(){

    const PoolData=await getPoolData(poolContract);
   
    //creating a local pool

    const TokenA_TokenB_Pool=new Pool(
          TokenA,
          TokenB,
          PoolData.fee,
          PoolData.sqrtPriceX96.toString(),
          PoolData.liquidity.toString(),
          PoolData.tick                       
    )

   
    const position = new Position({
        pool: TokenA_TokenB_Pool,
        liquidity: ethers.utils.parseUnits('0.001',18),
        tickLower: nearestUsableTick(PoolData.tick, PoolData.tickSpacing) - PoolData.tickSpacing * 2,
        tickUpper: nearestUsableTick(PoolData.tick, PoolData.tickSpacing) + PoolData.tickSpacing * 2,
      })

    
const Wallet=new ethers.Wallet(WALLETADDRESS);

const WalletAddress='0x0Ffd9b5D84DdE9299F58Af37d43be967f48920Bc';


const connecttoWallet=Wallet.connect(NetworkProvider);

//amount  approved for to store in the pool 

const ApprovalAmount=ethers.utils.parseUnits('100',18).toString();

const TokenAContract=new ethers.Contract(
    address0,
    ERC20ABI,
    NetworkProvider
)

await TokenAContract.connect(NetworkProvider).approve(
    NonFungablePositionManagerAddress,
    ApprovalAmount
)
   

const TokenBContract=new ethers.Contract(
    address1,
    ERC20ABI,
    NetworkProvider
)

await TokenBContract.connect(NetworkProvider).approve(
    NonFungablePositionManagerAddress,
    ApprovalAmount
)
   

const {amount0:amount0Desired,amount1:amount1Desired}=position.mintAmounts;



const pramas={
     TokenA:address0,
     TokenB:address1,
     fee:PoolData.fee,
     tickLower: nearestUsableTick(PoolData.tick, PoolData.tickSpacing) - PoolData.tickSpacing * 2,
     tickUpper: nearestUsableTick(PoolData.tick, PoolData.tickSpacing) + PoolData.tickSpacing * 2,
     amount0Desired:amount0Desired,
     amount1Desired:amount1Desired,
     amount0Min:amount0Desired,
     amount1Min:amount1Desired,
     recipient:WalletAddress,
     deadline:Math.floor(Date.now()/1000)*(60*10)
}

NonFungablePositionManagerContract.connect(connecttoWallet).mint(
    pramas,
    {gaslimit:ethers.utils.hexlify(1000000)}
).then((res)=>{
    console.log(res);
})


}


main();