import hre, {ethers} from "hardhat";
import {loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {CircuitTestUtils} from "hardhat-circom";

const {assert, expect} = require("chai");
const snarkjs = require("snarkjs");

const fixture = async () => {
  console.log("HERE");
  let circuit = await hre.circuitTest.setup("crop");
  console.log("CRIPJ");

  const sampleMatrix = Array.from({length: 700}, () =>
    Array.from({length: 700}, () => Array.from({length: 3}, () => Math.random()))
  );
  const croppedMatrix = sampleMatrix.slice(0, 350).map((row) => row.slice(0, 350));
  console.log("until end");

  return {
    circuit,
    sampleMatrix,
    croppedMatrix,
  };
};

describe("resize circuit", () => {
  describe("circuit tests", () => {
    it("produces a witness with valid constraints", async () => {
      const {circuit, sampleMatrix, croppedMatrix} = await loadFixture(fixture);
      const witness = await circuit.calculateWitness(
        {orig: sampleMatrix, new: croppedMatrix},
        true
      );
      console.log("WITNESSJj:w");
      await circuit.checkConstraints(witness);
    });

    it("has expected witness values", async () => {
      const {circuit, sampleMatrix, croppedMatrix} = await loadFixture(fixture);
      const witness = await circuit.calculateWitness(
        {orig: sampleMatrix, new: croppedMatrix},
        true
      );
      //assert.propertyVal(witness, "main.x", sampleInput.x);
      //assert.propertyVal(witness, "main.right", "11");
    });

    it("has the correct output", async () => {
      const {circuit, sampleMatrix, croppedMatrix} = await loadFixture(fixture);
      const witness = await circuit.calculateWitness(
        {orig: sampleMatrix, new: croppedMatrix},
        true
      );

      //const expected = {right: 11};
      //const witness = await circuit.calculateWitness(sampleInput, sanityCheck);
      //await circuit.assertOut(witness, expected);
    });

    it("fails if the input is wrong", async () => {
      //await expect(circuit.calculateWitness({x: 3}, sanityCheck)).to.be.rejectedWith(Error);
    });
  });
});
