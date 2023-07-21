import { HardhatUserConfig } from "hardhat/config";
import "@openzeppelin/hardhat-upgrades";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";
import "./tasks";

require("dotenv").config();
import "hardhat-circom";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    mumbai: {
      url: process.env.MUMBAI_URL as string || "",
      accounts: [
        process.env.PK as string || ""
      ]
    }
  }
  circom: {
    inputBasePath: "./circuits",
    ptau: "https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_15.ptau",
    circuits: [
      {
        name: "crop",
      },
      //{
      //name: "grayscale",
      //},
      //{
      //name: "resize",
      //},
    ],
  },
};

export default config;
