import {ethers, BigNumber, Contract} from "ethers";
import {
  JsonRpcProvider,
  Networkish,
  TransactionReceipt,
  Web3Provider,
} from "@ethersproject/providers";
import {LogDescription} from "@ethersproject/abi";

export const isProduction = () => process.env.NEXT_PUBLIC_PRODUCTION === "true";

export const toBN = ethers.BigNumber.from;

export const addressEqual = (a: string, b: string) =>
  ethers.utils.isAddress(a) && ethers.utils.isAddress(b) && a.toLowerCase() === b.toLowerCase();

export const getLogs = (contract: Contract, transaction: TransactionReceipt) => {
  const response: LogDescription[] = [];
  transaction.logs.forEach((log) => {
    try {
      if (addressEqual(log.address, contract.address))
        response.push(contract.interface.parseLog(log));
    } catch (err: any) {}
  });
  return response;
};

export const getProvider = (
  provider: string,
  options?: Networkish
): JsonRpcProvider | Web3Provider => {
  if (provider?.includes("wss")) return new ethers.providers.WebSocketProvider(provider);

  return new ethers.providers.JsonRpcProvider(provider, options);
};

export const calculateGasMargin = (value: BigNumber): BigNumber => {
  return value.mul(120).div(100);
};

export const formatAddress = (address: string, size = 7) =>
  `${address.substring(0, size)} ... ${address.slice(-size)}`;

export const ipfsToHttp = (ipfsHash: string) => `https://ipfs.io/ipfs/${ipfsHash}`;

export const isIpfsUrl = (url: string) => url.indexOf("ipfs") === 0;

export const wait = (seconds: number) =>
  new Promise((resolve, reject) => setTimeout(resolve, seconds));

export const getDateDay = (date: number) => {
  return new Date(date).toLocaleString().split(",")[0];
};

export const hash = (label: string) => ethers.utils.keccak256(ethers.utils.toUtf8Bytes(label));
