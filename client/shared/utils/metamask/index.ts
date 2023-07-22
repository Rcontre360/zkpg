import {ethers} from "ethers";

export const connect = async () => {
  // Check if MetaMask (or another Ethereum provider) is installed
  if (typeof (window as any).ethereum !== "undefined") {
    try {
      // Request account access, which will trigger the MetaMask popup
      const accounts = await (window as any).ethereum.request({method: "eth_requestAccounts"});

      // If connected successfully, the array of accounts is returned
      if (accounts.length > 0) {
        console.log("Connected with account:", accounts[0]);
        return accounts[0]; // Return the connected account
      } else {
        console.error("No accounts found");
        return null;
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error.message);
      return null;
    }
  } else {
    console.error("MetaMask is not installed");
    return null;
  }
};

export const sign_message = async (message: string) => {
  const accounts = await (window as any).ethereum.request({method: "eth_requestAccounts"});
  const account = accounts[0];

  const signature = await (window as any).ethereum.request({
    method: "personal_sign",
    params: [message, account],
  });

  console.log("Signature:", signature);
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

     // Debug: Log the provider object
     console.log('Provider: ', provider);

    return provider;
  } else {
    throw new Error("MetaMask is not installed.");
  }
}
