import { task } from "hardhat/config";
import {
    ClaimBuilder,
    OnChainIdentity,
    IdentityBase
} from "../typechain-types";

task("deploy", "Deploy the contract", async (_, hre ) => {
    const signers = await hre.ethers.getSigners();
    const factory = await hre.ethers.getContractFactory(
        "Identity",
        signers[0],
        {
            libraries: {

            }
        }
    );
    const contract = await factory.deploy(
        "0x134B1BE34911E39A8397ec6289782989729807a4",
        
    );
    await contract.waitForDeployment();
    console.log("Contract deployed to:", await contract.getAddress());
});