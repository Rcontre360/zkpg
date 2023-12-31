import {TransactionReceipt, TransactionResponse} from "@ethersproject/providers";
import {ethers} from "ethers";
import {getEthersProvider} from "../metamask";
import zkpg from "./ZKPG.json";

//const snarkjs = require("./snarkjs");
export const ZKPG = "0x4dDD05E0667F9098f958722AFeEA61565e4653e6";

export const getZKPG = async () => {
  const signer = await getEthersProvider();
  return new ethers.Contract(ZKPG, zkpg, signer.getSigner());
};

export const sendPublishAttestation = async (object: {schema: string; data: any}) => {
  const zkpgContract = await getZKPG();

  return (await zkpgContract.publishAttestation(object)) as TransactionResponse;
};

export const sendModifyAttestation = async (
  object: {schema: string; data: any},
  verifier: string,
  proof: string[],
  pubSignals: string[]
) => {
  const zkpgContract = await getZKPG();

  return (await zkpgContract.modificationAttestation(
    object,
    verifier,
    proof,
    pubSignals
  )) as TransactionResponse;
};
