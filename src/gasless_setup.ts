import { ethers } from "ethers";
import { createNewPackage, ethersGasStationContract, getDAOAddress } from "./lib/gasless";


const main = async () => {
  console.log("\n\n[Setting up gasless]\n\n");

  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const daoWallet = new ethers.Wallet(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    provider
  );

  const daoAddress = await getDAOAddress(provider);
  console.log(`DAO Address: ${daoAddress}`);
  
  await createNewPackage(daoWallet, {
    name: "Test Package",
    cost: ethers.parseEther("1"),
    creditsAwarded: ethers.parseEther("1"),
    paymentToken: ethers.ZeroAddress,
    burnPercentage: 0n
  })
  console.log("Package created");
};

main().catch(console.error);
