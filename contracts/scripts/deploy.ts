import fs from "fs";
import path from "path";
import { DeployHelper } from "../helpers/DeployHelper";
const pathOutputJson = path.join(__dirname, "./deploy_output.json");

async function main() {
  const deployHelper = await DeployHelper.initialize(null, true);

  const { state, smtLib, poseidon1, poseidon2, poseidon3 } =
    await deployHelper.deployStateV2();

  const outputJson = {
    state: state,
    smtLib: smtLib,
    poseidon1: poseidon1,
    poseidon2: poseidon2,
    poseidon3: poseidon3,
    network: process.env.HARDHAT_NETWORK,
  };
  fs.writeFileSync(pathOutputJson, JSON.stringify(outputJson, null, 1));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });