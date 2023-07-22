import { ethers } from "ethers";
import { getEthersProvider } from "../metamask";
import zkpg from "./ZKPG.json";

//const snarkjs = require("./snarkjs");
export const ZKPG = "0xBa003F28Ec83Aaa9600d4c0553a50552Dc9881bF";

export const getZKPG = async () => {
  const signer = await getEthersProvider();
  return new ethers.Contract(ZKPG, zkpg, signer.getSigner());
};

export const sendPublishAttestation = async (object: { schema: string; data: any }) => {
  const zkpgContract = await getZKPG();

  console.log(object);
  const tx = await zkpgContract.publishAttestation(object);
};

export const sendModifyAttestation = async (
  object: { schema: string; data: any },
  verifier: string,
  proof: string[],
  pubSignals: string[]
) => {
  const zkpgContract = await getZKPG();

  const tx = await zkpgContract.modificationAttestation(object, verifier, proof, pubSignals);
};
