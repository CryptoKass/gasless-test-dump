import { ethers, parseEther } from "ethers";
import { anvilWallets } from "./lib/anvil";
import { getContractInfo, getCreditPackage, getNextPackageId, registerContract, setSingleUse, setWhitelist } from "./lib/gasless";
import { formatJSON } from "./lib/format";
import { callExampleContract, deployExampleContract, getExampleContract } from "./lib/example";

const main = async () => {

  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const bob = new ethers.Wallet(
    anvilWallets[1],
    provider
  );
  
  console.log("\n\n[Setting Example Contract]\n\n");
  
  console.log("Deploying example contract...");
  const exampleContractAddress = await deployExampleContract(bob);
  console.log(`Example Contract Address: ${exampleContractAddress}`);

  console.log("\n\n[Registering contract]\n\n");
  
  const packageId = (await getNextPackageId(provider)) - 1n;
  console.log(`Package ID: ${packageId}`);

  // check package info
  const packageInfo = await getCreditPackage(provider, packageId);
  console.log(`Package Info: ${formatJSON(packageInfo)}`);

  await registerContract(bob, {
    contractAddress: exampleContractAddress,
    adminAddress: bob.address,
    packageId: packageId,
  });
  console.log("Contract registered!");

  const contractInfo = await getContractInfo(provider, exampleContractAddress);
  console.log(`Contract Info: ${formatJSON(contractInfo)}`);

   await setSingleUse(bob, exampleContractAddress, false);
  await setWhitelist(bob, exampleContractAddress, false);


  console.log("\n\n[Calling contract]\n\n");

  console.log("Available credits: ", contractInfo.credits);
  console.log("Calling example contract gasless...");
  await callExampleContract(exampleContractAddress, bob, {
    value: parseEther("1"),
    maxFeePerGas: 0,
    maxPriorityFeePerGas: 0,
    type: 2, // EIP-1559
  });

  const postUseContractInfo = await getContractInfo(provider, exampleContractAddress);
  console.log(`Contract Info after use: ${formatJSON(postUseContractInfo)}`);
  console.log(`\n\nContract Credits used: ${contractInfo.credits - postUseContractInfo.credits}`);
};

main().catch(console.error);