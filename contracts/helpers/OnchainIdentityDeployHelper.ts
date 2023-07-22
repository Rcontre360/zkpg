import { ethers, upgrades } from "hardhat";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

export class OnchainIdentityDeployHelper {
  constructor(
    private signers: SignerWithAddress[],
    private readonly enableLogging: boolean = false
  ) {}

  static async initialize(
    signers: SignerWithAddress[] | null = null,
    enableLogging = false
  ): Promise<OnchainIdentityDeployHelper> {
    let sgrs;
    if (signers === null) {
      sgrs = await ethers.getSigners();
    } else {
      sgrs = signers;
    }
    return new OnchainIdentityDeployHelper(sgrs, enableLogging);
  }

  async deployIdentity(
    state: string,
    smtLib: string,
    poseidon3: string,
    poseidon4: string
  ): Promise<{
    identity: string;
  }> {
    const owner = this.signers[0];

    this.log("======== Identity: deploy started ========");

    const cb = await this.deployClaimBuilder();
    const il = await this.deployIdentityLib(smtLib, poseidon3, poseidon4);

    this.log("deploying Identity...");
    const IdentityFactory = await ethers.getContractFactory(
        "Identity",
        {
            libraries: {
                ClaimBuilder: cb,
                OnChainIdentity: il,
            },
        }
    );
    // const IdentityFactory = await ethers.getContractFactory("Identity");
    const Identity = await upgrades.deployProxy(IdentityFactory, [state], {
      unsafeAllowLinkedLibraries: true,
    });
    await Identity.waitForDeployment();
    this.log(`Identity contract deployed to address ${await Identity.getAddress()} from ${owner.address}`);

    this.log("======== Identity: deploy completed ========");

    return {
      identity: await Identity.getAddress(),
    };
  }

  async deployClaimBuilder(): Promise<string> {
    const ClaimBuilder = await ethers.getContractFactory("ClaimBuilder");
    const cb = await ClaimBuilder.deploy();
    await cb.waitForDeployment();
    this.enableLogging && this.log(`ClaimBuilder deployed to: ${await cb.getAddress()}`);

    return cb.getAddress();
  }

  async deployIdentityLib(
    smtpAddress: string,
    poseidonUtil3lAddress: string,
    poseidonUtil4lAddress: string
 ): Promise<string> {

    const Identity = await ethers.getContractFactory(
      "OnChainIdentity", 
      {
        libraries: {
          SmtLib: smtpAddress,
          PoseidonUnit3L: poseidonUtil3lAddress,
          PoseidonUnit4L: poseidonUtil4lAddress,
        }
      }
    );
    const il = await Identity.deploy();
    await il.waitForDeployment();
    this.enableLogging && this.log(`ClaimBuilder deployed to: ${await il.getAddress()}`);

    return il.getAddress();
  }

  async deployClaimBuilderWrapper(): Promise<{
    address: string;
  }> {
  
    const cb = await this.deployClaimBuilder();
  
    const ClaimBuilderWrapper = await ethers.getContractFactory("ClaimBuilderWrapper", {
      libraries: {
        ClaimBuilder: cb.address
      }
    });
    const claimBuilderWrapper = await ClaimBuilderWrapper.deploy();
    console.log("ClaimBuilderWrapper deployed to:", claimBuilderWrapper.address);
    return claimBuilderWrapper;
  }

  private log(...args: any): void {
    this.enableLogging && console.log(args);
  }
}