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

  console.log("Deploying example contract...");
  const exampleContractAddress = await deployExampleContract(bob);
  console.log(`Example Contract Address: ${exampleContractAddress}`);

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

  const singleUseTx = await setSingleUse(bob, exampleContractAddress, false);
  console.log(`[TX] Single use setting transaction submitted: ${singleUseTx}`);
  const whitelistTx = await setWhitelist(bob, exampleContractAddress, false);
  console.log(`[TX] Whitelist setting transaction submitted: ${whitelistTx}`);
  const receipt = await provider.waitForTransaction(singleUseTx);

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