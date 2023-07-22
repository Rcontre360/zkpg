import fs from "fs";
import path from "path";
import { OnchainIdentityDeployHelper } from "../helpers/OnchainIdentityDeployHelper";
const pathOutputJson = path.join(__dirname, "./deploy_output.json");

async function main() {
    const deployHelper = await OnchainIdentityDeployHelper.initialize();
    const contracts = await deployHelper.deployIdentity(
      "0x134B1BE34911E39A8397ec6289782989729807a4",
      "0x7F2075188B2E3693357D0e2DC1A68c0D5a9d18C6",
      "0x8FdAFea3Df65154994093aD5adB2B23CaA28EDD9",
      "0xcd7DFf4405719AE5884D4a17242dD53593c75BD9"
    );

    const identity = contracts.identity;


  const outputJson = {
    identity: identity,
    state: "0x134B1BE34911E39A8397ec6289782989729807a4",
    smtLib: "0x7F2075188B2E3693357D0e2DC1A68c0D5a9d18C6",
    poseidon1: "0x3ab176e36dA488DBF7c6542126c8cF621C268649",
    poseidon2: "0xD2874d9174fFa6d3a3601Bfb184d93CfB026890d",
    poseidon3: "0x8FdAFea3Df65154994093aD5adB2B23CaA28EDD9",
    poseidon4: "0xcd7DFf4405719AE5884D4a17242dD53593c75BD9",
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