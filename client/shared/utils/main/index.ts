import {ethers} from "ethers";
import {getEthersProvider} from "../metamask";
import zkpg from "./ZKPG.json";

//const snarkjs = require("./snarkjs");
export const ZKPG = "0x29893e255Dc64d63BaC93F538403027d57d41896";

export const getZKPG = async () => {
  const signer = await getEthersProvider();
  return new ethers.Contract(ZKPG, zkpg, signer);
};

export const sendPublishAttestation = async (object: {schema: string; data: any}) => {
  const zkpgContract = await getZKPG();

  const tx = await zkpgContract.publishAttestation(object);
};

export const sendModifyAttestation = async (
  object: {schema: string; data: any},
  verifier: string,
  proof: string[],
  pubSignals: string[]
) => {
  const zkpgContract = await getZKPG();

  const tx = await zkpgContract.modificationAttestation(object);
};
