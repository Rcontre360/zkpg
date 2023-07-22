import path from "path";
import fs from "fs";
import { ethers } from "hardhat";

const pathOutputJson = path.join(__dirname, "./deploy_verifier_output.json");

async function main() {
  const verifierContract = "ZKPG";
  const easContract = "0x2cDc1DDe90125Dd4E43C61247dF8892Ee15327Ce";

  // Values given by PolygonId.
  const sigValidator = "0xF2D4Eeb4d455fb673104902282Ce68B9ce4Ac450";
  const spongePoseidonLib = "0x12d8C87A61dAa6DD31d8196187cFa37d1C647153";
  const poseidon6Lib = "0xb588b8f07012Dc958aa90EFc7d3CF943057F17d7";

  const ZKPG = await ethers.getContractFactory(verifierContract, {
    libraries: {
      SpongePoseidon: spongePoseidonLib,
      PoseidonUnit6L: poseidon6Lib,
    },
  });
  const zkpgContract = await ZKPG.deploy(easContract);

  await zkpgContract.waitForDeployment();
  console.log("contract address:", await zkpgContract.getAddress());

  const outputJson = {
    verifier: await zkpgContract.getAddress(),
    eas: easContract,
    sigValidator: sigValidator,
    spongePoseidonLib: spongePoseidonLib,
    poseidon6Lib: poseidon6Lib,
    network: process.env.HARDHAT_NETWORK,
  };
  fs.writeFileSync(pathOutputJson, JSON.stringify(outputJson, null, 1));
}

// Init
// ========================================================
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
