import { ethers } from "ethers";

// Types that map exactly to contract return types
export interface CreditPackage {
  active: boolean;
  name: string;
  costInWei: bigint;
  creditsAwarded: bigint;
  paymentToken: string;
  burnPercentage: bigint;
}

export interface ContractInfo {
  registered: boolean;
  active: boolean;
  admin: string;
  credits: bigint;
  whitelistEnabled: boolean;
  singleUseEnabled: boolean;
}

export interface PackageCreationParams {
  name: string;
  cost: bigint;
  creditsAwarded: bigint;
  paymentToken: string;
  burnPercentage: bigint;
}

export interface ContractRegistrationParams {
  contractAddress: string;
  adminAddress: string;
  packageId: bigint;
}

export const gasStationAddress = "0x4300000000000000000000000000000000000001";
export const gasStationABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AlreadyRegistered",
    type: "error",
  },
  {
    inputs: [],
    name: "EmptyPackageName",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientCredits",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientPayment",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidBurnPercentage",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidContract",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidTokenPayment",
    type: "error",
  },
  {
    inputs: [],
    name: "NotAdmin",
    type: "error",
  },
  {
    inputs: [],
    name: "NotAuthorized",
    type: "error",
  },
  {
    inputs: [],
    name: "NotDAO",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
  },
  {
    inputs: [],
    name: "NotRegistered",
    type: "error",
  },
  {
    inputs: [],
    name: "PackageNotActive",
    type: "error",
  },
  {
    inputs: [],
    name: "PackageNotFound",
    type: "error",
  },
  {
    inputs: [],
    name: "TokenTransferFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroAddress",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "active",
        type: "bool",
      },
      {
        indexed: true,
        internalType: "address",
        name: "changedBy",
        type: "address",
      },
    ],
    name: "ActiveStatusChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "oldAdmin",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "changedBy",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "registeredBy",
        type: "address",
      },
    ],
    name: "ContractRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "by",
        type: "address",
      },
    ],
    name: "ContractRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "by",
        type: "address",
      },
    ],
    name: "ContractUnregistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "packageId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "cost",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "creditsAwarded",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "burnPercentage",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "addedBy",
        type: "address",
      },
    ],
    name: "CreditPackageAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "packageId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "active",
        type: "bool",
      },
      {
        indexed: true,
        internalType: "address",
        name: "changedBy",
        type: "address",
      },
    ],
    name: "CreditPackageStatusChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "packageId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "cost",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "creditsAwarded",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "burnPercentage",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "updatedBy",
        type: "address",
      },
    ],
    name: "CreditPackageUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "by",
        type: "address",
      },
    ],
    name: "CreditsAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "packageId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "purchaser",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "creditsAwarded",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "cost",
        type: "uint256",
      },
    ],
    name: "CreditsPurchased",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "by",
        type: "address",
      },
    ],
    name: "CreditsRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "previousAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newAmount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "by",
        type: "address",
      },
    ],
    name: "CreditsSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "gasUsed",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "creditsDeducted",
        type: "uint256",
      },
    ],
    name: "CreditsUsed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldDAO",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newDAO",
        type: "address",
      },
    ],
    name: "DAOChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "payer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "refund",
        type: "uint256",
      },
    ],
    name: "ETHPaymentProcessed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "withdrawnBy",
        type: "address",
      },
    ],
    name: "ETHWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "enabled",
        type: "bool",
      },
      {
        indexed: true,
        internalType: "address",
        name: "changedBy",
        type: "address",
      },
    ],
    name: "SingleUseStatusChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "payer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "burnAmount",
        type: "uint256",
      },
    ],
    name: "TokenPaymentProcessed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TokensBurned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "withdrawnBy",
        type: "address",
      },
    ],
    name: "TokensWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "users",
        type: "address[]",
      },
      {
        indexed: true,
        internalType: "address",
        name: "resetBy",
        type: "address",
      },
    ],
    name: "UsedAddressesReset",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "users",
        type: "address[]",
      },
      {
        indexed: true,
        internalType: "address",
        name: "addedBy",
        type: "address",
      },
    ],
    name: "UsersAddedToWhitelist",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "users",
        type: "address[]",
      },
      {
        indexed: true,
        internalType: "address",
        name: "removedBy",
        type: "address",
      },
    ],
    name: "UsersRemovedFromWhitelist",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "enabled",
        type: "bool",
      },
      {
        indexed: true,
        internalType: "address",
        name: "changedBy",
        type: "address",
      },
    ],
    name: "WhitelistStatusChanged",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "cost",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "creditsAwarded",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "burnPercentage",
        type: "uint256",
      },
    ],
    name: "addCreditPackage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "addCredits",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "users",
        type: "address[]",
      },
    ],
    name: "addToWhitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "contracts",
    outputs: [
      {
        internalType: "bool",
        name: "registered",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "active",
        type: "bool",
      },
      {
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "credits",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "whitelistEnabled",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "singleUseEnabled",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "packageId",
        type: "uint256",
      },
    ],
    name: "creditPackages",
    outputs: [
      {
        internalType: "bool",
        name: "active",
        type: "bool",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "costInWei",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "creditsAwarded",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "burnPercentage",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "dao",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getActivePackageIds",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "getAdmin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "getCredits",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNextPackageId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "getSingleUseStatus",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "getWhitelistStatus",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_dao",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "isActive",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "isAddressUsed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "packageId",
        type: "uint256",
      },
    ],
    name: "isPackageActive",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "isRegistered",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "isWhitelisted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "packageId",
        type: "uint256",
      },
    ],
    name: "purchaseCredits",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "packageId",
        type: "uint256",
      },
    ],
    name: "registerContract",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "removeContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "removeCredits",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "users",
        type: "address[]",
      },
    ],
    name: "removeFromWhitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "users",
        type: "address[]",
      },
    ],
    name: "resetUsedAddresses",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "bool",
        name: "active",
        type: "bool",
      },
    ],
    name: "setActive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "setAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "packageId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "active",
        type: "bool",
      },
    ],
    name: "setCreditPackageActive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "setCredits",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newDAO",
        type: "address",
      },
    ],
    name: "setDAO",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "bool",
        name: "enabled",
        type: "bool",
      },
    ],
    name: "setSingleUseEnabled",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "bool",
        name: "enabled",
        type: "bool",
      },
    ],
    name: "setWhitelistEnabled",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "unregisterContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "packageId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "cost",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "creditsAwarded",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "burnPercentage",
        type: "uint256",
      },
    ],
    name: "updateCreditPackage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawETH",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

export const ethersGasStationContract = (
  providerOrSigner: ethers.Provider | ethers.Signer
) => new ethers.Contract(gasStationAddress, gasStationABI, providerOrSigner);

// function to get DAO address
export async function getDAOAddress(
  provider: ethers.Provider
): Promise<string> {
  const contract = ethersGasStationContract(provider);
  const daoAddress: string = await contract.dao();
  return daoAddress;
}

export const sendGasless = async (
  provider: ethers.JsonRpcProvider,
  from: ethers.Wallet,
  to: string,
  value: string
) => {
  const fromBalance = await provider.getBalance(from.address);
  const toBalance = await provider.getBalance(to);
  console.log(`[PRE] Sender balance: ${ethers.formatEther(fromBalance)}`);
  console.log(`[PRE] Recipient balance: ${ethers.formatEther(toBalance)}`);

  const tx = await from.sendTransaction({
    to: to,
    value: ethers.parseEther(value),
    maxFeePerGas: 0,
    maxPriorityFeePerGas: 0,
    type: 2, // EIP-1559
  });
  console.log(
    `[TX] Sent: ${tx.hash}, gas: ${tx.gasLimit}, nonce: ${tx.nonce}, price: ${
      tx.maxFeePerGas || tx.gasPrice
    }`
  );
  const receipt = (await tx.wait())!;
  console.log(
    `[TX] Receipt: ${receipt.status} Gas used: ${receipt.gasUsed} Gas Price: ${receipt.gasPrice}`
  );

  const fromBalanceAfter = await provider.getBalance(from.address);
  const toBalanceAfter = await provider.getBalance(to);
  console.log(
    `[POST] Sender Balance Change: ${ethers.formatEther(
      fromBalanceAfter - fromBalance
    )}`
  );
  console.log(
    `[POST] Recipient Balance Change: ${ethers.formatEther(
      toBalanceAfter - toBalance
    )}`
  );
};

export const createNewPackage = async (
  signer: ethers.Signer,
  params: PackageCreationParams
): Promise<string> => {
  const contract = ethersGasStationContract(signer);

  console.log(`Creating new package: ${params.name}`);
  console.log(`Cost: ${ethers.formatEther(params.cost)} ETH`);
  console.log(`Credits: ${params.creditsAwarded}`);
  console.log(`Payment Token: ${params.paymentToken}`);
  console.log(`Burn Percentage: ${Number(params.burnPercentage) / 100}%`);

  const tx = await contract.addCreditPackage(
    params.name,
    params.cost,
    params.creditsAwarded,
    params.paymentToken,
    params.burnPercentage
  );

  console.log(`[TX] Package creation transaction submitted: ${tx.hash}`);

  // Wait for transaction confirmation
  const receipt = await tx.wait();

  console.log(`[TX] Package created successfully! Transaction: ${tx.hash}`);
  return tx.hash;
};


export const registerContract = async (
  signer: ethers.Signer,
  params: ContractRegistrationParams
): Promise<string> => {
  const contract = ethersGasStationContract(signer);

  console.log(`Registering contract: ${params.contractAddress}`);
  console.log(`Admin: ${params.adminAddress}`);
  console.log(`Package ID: ${params.packageId}`);

  const packageInfo: CreditPackage = await contract.creditPackages(params.packageId);
  if (!packageInfo.active) {
    throw new Error("Package is not active");
  }
  
  const tx = await contract.registerContract(
    params.contractAddress,
    params.adminAddress,
    params.packageId,
    { value:  packageInfo.costInWei * 2n }
  );

  console.log(`[TX] Contract registration transaction submitted: ${tx.hash}`);

  const receipt = await tx.wait();

  console.log(`[TX] Contract registered successfully! Transaction: ${tx.hash}`);
  return tx.hash;
};

// Utility functions that return typed data
export const getCreditPackage = async (
  provider: ethers.Provider,
  packageId: bigint
): Promise<CreditPackage> => {
  const contract = ethersGasStationContract(provider);
  const packageData = await contract.creditPackages(packageId);
  
  return {
    active: packageData.active,
    name: packageData.name,
    costInWei: packageData.costInWei,
    creditsAwarded: packageData.creditsAwarded,
    paymentToken: packageData.paymentToken,
    burnPercentage: packageData.burnPercentage,
  };
};

export const getContractInfo = async (
  provider: ethers.Provider,
  contractAddress: string
): Promise<ContractInfo> => {
  const contract = ethersGasStationContract(provider);
  const contractData = await contract.contracts(contractAddress);
  
  return {
    registered: contractData.registered,
    active: contractData.active,
    admin: contractData.admin,
    credits: contractData.credits,
    whitelistEnabled: contractData.whitelistEnabled,
    singleUseEnabled: contractData.singleUseEnabled,
  };
};

export const getActivePackageIds = async (
  provider: ethers.Provider
): Promise<bigint[]> => {
  const contract = ethersGasStationContract(provider);
  return await contract.getActivePackageIds();
};

export const getNextPackageId = async (
  provider: ethers.Provider
): Promise<bigint> => {
  const contract = ethersGasStationContract(provider);
  return await contract.getNextPackageId();
};

export const setWhitelist = async (
  signer: ethers.Signer,
  contractAddress: string,
  enabled: boolean
): Promise<string> => {
  const contract = ethersGasStationContract(signer);

  console.log(`Setting whitelist for contract: ${contractAddress}`);
  console.log(`Enabled: ${enabled}`);

  const tx = await contract.setWhitelistEnabled(contractAddress, enabled);

  console.log(`[TX] Whitelist setting transaction submitted: ${tx.hash}`);

  const receipt = await tx.wait();

  console.log(`[TX] Whitelist setting completed successfully! Transaction: ${tx.hash}`);
  return tx.hash;
};

export const setSingleUse = async (
  signer: ethers.Signer,
  contractAddress: string,
  enabled: boolean
): Promise<string> => {
  const contract = ethersGasStationContract(signer);

  console.log(`Setting single use for contract: ${contractAddress}`);
  console.log(`Enabled: ${enabled}`);

  const tx = await contract.setSingleUseEnabled(contractAddress, enabled);

  console.log(`[TX] Single use setting transaction submitted: ${tx.hash}`);

  const receipt = await tx.wait();

  console.log(`[TX] Single use setting completed successfully! Transaction: ${tx.hash}`);
  return tx.hash;
};
