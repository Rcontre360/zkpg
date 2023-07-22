import {ethers} from "hardhat";
import path from "path";
import fs from "fs";
import {CropVerifier} from "../typechain-types";

const pathOutputJson = path.join(__dirname, "./verifiers_output.json");

async function main() {
  const [signer] = await ethers.getSigners();
  const cropFactory = await ethers.getContractFactory("CropVerifier", signer);

  const cropVerifier: CropVerifier = await cropFactory.deploy();
  const outputJson = {
    crop: await cropVerifier.getAddress(),
  };

  fs.writeFileSync(pathOutputJson, JSON.stringify(outputJson, null, 1));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
