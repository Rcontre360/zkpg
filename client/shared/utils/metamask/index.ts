import {ethers} from "ethers";

export const connect = async () => {
  return await (window as any).ethereum.request({method: "eth_requestAccounts"});
};

export const sign_message = async (message: string) => {
  const accounts = await (window as any).ethereum.request({method: "eth_requestAccounts"});
  const account = accounts[0];

  const signature = await (window as any).ethereum.request({
    method: "personal_sign",
    params: [message, account],
  });
  
  return signature;
};

export const getAccount = async () => {
  const accounts = await (window as any).ethereum.request({method: "eth_requestAccounts"});
  return accounts[0];
};

export async function getEthersProvider() {
  // Check if MetaMask is installed
  if (typeof (window as any).ethereum !== "undefined") {
    // Request account access
    const accounts = await (window as any).ethereum.request({method: "eth_requestAccounts"});

    if (accounts.length === 0) {
      throw new Error("No account is connected with MetaMask.");
    }

    // Create an ethers provider from the MetaMask provider
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);

    return provider;
  } else {
    throw new Error("MetaMask is not installed.");
  }
}
