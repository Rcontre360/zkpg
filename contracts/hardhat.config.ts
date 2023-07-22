import {HardhatUserConfig} from "hardhat/config";
//import "@openzeppelin/hardhat-upgrades";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";

require("dotenv").config();

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
};

export default config;
