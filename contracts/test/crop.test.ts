import hre, {ethers} from "hardhat";

const {assert, expect} = require("chai");
const snarkjs = require("snarkjs");

describe("quadratic circuit", () => {
  let circuit;

  const sampleInput = {
    x: "2",
  };
  const sanityCheck = true;

  before(async () => {
    circuit = await hre.circuitTest.setup("quadratic");
  });

  describe("circuit tests", () => {
    it("produces a witness with valid constraints", async () => {
      const witness = await circuit.calculateWitness(sampleInput, sanityCheck);
      await circuit.checkConstraints(witness);
    });

    it("has expected witness values", async () => {
      const witness = await circuit.calculateLabeledWitness(sampleInput, sanityCheck);
      assert.propertyVal(witness, "main.x", sampleInput.x);
      assert.propertyVal(witness, "main.right", "11");
    });

    it("has the correct output", async () => {
      const expected = {right: 11};
      const witness = await circuit.calculateWitness(sampleInput, sanityCheck);
      await circuit.assertOut(witness, expected);
    });

    it("fails if the input is wrong", async () => {
      await expect(circuit.calculateWitness({x: 3}, sanityCheck)).to.be.rejectedWith(Error);
    });
  });
});
