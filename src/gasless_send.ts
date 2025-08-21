import { ethers, parseEther } from "ethers";
import { anvilWallets } from "./lib/anvil";
import { getContractInfo } from "./lib/gasless";
import { formatJSON } from "./lib/format";
import { callExampleContract } from "./lib/example";

export const main = async () => {
    const exampleContractAddress = process.env.CONTRACT!;
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const bob = new ethers.Wallet(
        anvilWallets[1],
        provider
    );

    const contractInfo = await getContractInfo(provider, exampleContractAddress);
    console.log(`Contract Info: ${formatJSON(contractInfo)}`);

    await callExampleContract(exampleContractAddress, bob, {
        value: parseEther("0.000000000000000001"),
        maxFeePerGas: 0,
        maxPriorityFeePerGas: 0,
        type: 2, // EIP-1559
    });

    const postUseContractInfo = await getContractInfo(provider, exampleContractAddress);
    console.log(`Contract Info after use: ${formatJSON(postUseContractInfo)}`);
    console.log(`\n\nContract Credits used: ${contractInfo.credits - postUseContractInfo.credits}`);
};