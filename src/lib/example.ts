import { ethers } from "ethers";

export const exampleContractABI = [
	{
		"inputs": [],
		"name": "helloWorld",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
]

export const exampleContractBytecode = "6080604052348015600e575f80fd5b5060a280601a5f395ff3fe608060405260043610601b575f3560e01c8063c605f76c14601f575b5f80fd5b60256027565b005b3373ffffffffffffffffffffffffffffffffffffffff166108fc3490811502906040515f60405180830381858888f193505050501580156069573d5f803e3d5ffd5b5056fea2646970667358221220e94ffd1e57abb2d26c57ec6db5654987147ccf25d38e4f1e1e46844cf926a15964736f6c63430008190033"

export const deployExampleContract = async (wallet: ethers.Wallet) => {
    const factory = new ethers.ContractFactory(exampleContractABI, exampleContractBytecode, wallet);
    const contract = await factory.deploy();
    const tx = contract.deploymentTransaction()!;
    const receipt = await wallet.provider!.waitForTransaction(tx.hash);
    console.log(`[TX] Deployment Gas Price: ${receipt!.gasPrice?.toString()}`);
    await contract.waitForDeployment();
    return contract.getAddress();
}

export const getExampleContract = async (provider: ethers.ContractRunner, address: string) => {
    const contract = new ethers.Contract(address, exampleContractABI, provider);
    return contract;
}

export const callExampleContract = async (contractAddress: string, wallet: ethers.Wallet, overrides: ethers.TransactionRequest) => {
    const contract = await getExampleContract(wallet, contractAddress);
    const tx = await contract.helloWorld({
        ...overrides,
    });
    const receipt = await tx.wait();
    console.log(`[TX] Example Contract Call: ${tx.hash}, Value: ${overrides.value}, Gas: ${receipt.gasUsed.toString()}, Gas Price: ${receipt.gasPrice?.toString()}`);
    return receipt;
}
