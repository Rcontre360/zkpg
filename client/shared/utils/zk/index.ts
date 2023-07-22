import {ImageMatrix} from "../images";

//const snarkjs = require("./snarkjs");

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

  const stringProof = JSON.stringify(proof, null, 1);

  console.log("PROOF", proof, publicSignals);
  const vkey = await fetch("./zk/crop/verification_key.json").then(function (res) {
    return res.json();
  });
  console.log("VKEY", vkey);

  const res = await snarkjs.plonk.verify(vkey, publicSignals, proof);
  console.log("RES", res);

  return {stringProof, result: res};
}
