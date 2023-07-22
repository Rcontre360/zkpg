import {ethers} from "ethers";
import {ImageMatrix} from "../images";
import {getEthersProvider} from "../metamask";
import cropVerifier from "./CropVerifier.json";

//const snarkjs = require("./snarkjs");
export const CROP_VERIFIER = "0x769Ca7bBDE1D731a2352133ebb805C658177D506";

export const getCropVerifier = async () => {
  const signer = await getEthersProvider();
  return new ethers.Contract(CROP_VERIFIER, cropVerifier, signer);
};

export async function calculateCropProof(
  originalImageMatrix: ImageMatrix,
  newImageMatrixc: ImageMatrix
) {
  let snarkjs = (window as any).snarkjs;
  console.log("SNARKJS!!", originalImageMatrix.length, newImageMatrixc.length);
  const {proof, publicSignals} = await snarkjs.plonk.fullProve(
    {orig: originalImageMatrix, new: newImageMatrixc},
    "./zk/crop/circuit.wasm",
    "./zk/crop/circuit_final.zkey"
  );

  const vkey = await fetch("./zk/crop/verification_key.json").then(function (res) {
    return res.json();
  });
  const res = await snarkjs.plonk.verify(vkey, publicSignals, proof);
  console.log("RES", res);

  const solidityProof = [
    ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.A[0]).toHexString(), 32),
    ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.A[1]).toHexString(), 32),
    ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.B[0]).toHexString(), 32),
    ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.B[1]).toHexString(), 32),
    ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.C[0]).toHexString(), 32),
    ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.C[1]).toHexString(), 32),
    ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.Z[0]).toHexString(), 32),
    ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.Z[1]).toHexString(), 32),
    ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.T1[0]).toHexString(), 32),
    ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.T1[1]).toHexString(), 32),
    ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.T2[0]).toHexString(), 32),
    ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.T2[1]).toHexString(), 32),
    ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.T3[0]).toHexString(), 32),
    ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.T3[1]).toHexString(), 32),
    ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.Wxi[0]).toHexString(), 32),
    ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.Wxi[1]).toHexString(), 32),
    ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.Wxiw[0]).toHexString(), 32),
    ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.Wxiw[1]).toHexString(), 32),

    ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.eval_a).toHexString(), 32),
    ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.eval_b).toHexString(), 32),
    ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.eval_c).toHexString(), 32),
    ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.eval_s1).toHexString(), 32),
    ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.eval_s2).toHexString(), 32),
    ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.eval_zw).toHexString(), 32),
  ];

  return {proof, solidityProof, publicSignals, result: res};
}
