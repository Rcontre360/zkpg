import { ethers, network } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { deployPoseidons } from "./PoseidonDeployHelper";
import { chainIdDefaultIdTypeMap } from "./ChainIdDefTypeMap";

export class DeployHelper {
  constructor(
    private signers: SignerWithAddress[],
    private readonly enableLogging: boolean = false
  ) {}

  static async initialize(
    signers: SignerWithAddress[] | null = null,
    enableLogging = false
  ): Promise<DeployHelper> {
    let sgrs;
    if (signers === null) {
      sgrs = await ethers.getSigners();
    } else {
      sgrs = signers;
    }
    return new DeployHelper(sgrs, enableLogging);
  }

  async deployStateV2(): Promise<{
    state: string;
    smtLib: string;
    poseidon1: string;
    poseidon2: string;
    poseidon3: string;
    poseidon4: string;
  }> {
    this.log("======== State: deploy started ========");

    const { defaultIdType, chainId } = await this.getDefaultIdType();
    this.log(`found defaultIdType ${defaultIdType} for chainId ${chainId}`);

    const owner = this.signers[0];

    this.log("deploying poseidons...");
    const [poseidon1Elements, poseidon2Elements, poseidon3Elements, poseidon4Elements] = await deployPoseidons(
      owner,
      [1, 2, 3, 4]
    );

    this.log("deploying SmtLib...");
    const smtLib = await this.deploySmtLib(poseidon2Elements, poseidon3Elements);

    this.log("Using Polygon state contract...");
    const stateContract = "0x134B1BE34911E39A8397ec6289782989729807a4";
    this.log(`Polygon State Contract ${stateContract}`);

    this.log("======== StateV2: deploy completed ========");

    return {
      state: stateContract,
      smtLib,
      poseidon1: poseidon1Elements,
      poseidon2: poseidon2Elements,
      poseidon3: poseidon3Elements,
      poseidon4: poseidon4Elements,
    };
  }

  async deploySmtLib(
    poseidon2Address: string,
    poseidon3Address: string,
    contractName = "SmtLib"
  ): Promise<string> {
    const SmtLib = await ethers.getContractFactory(contractName, {
      libraries: {
        PoseidonUnit2L: poseidon2Address,
        PoseidonUnit3L: poseidon3Address,
      },
    });
    const smtLib = await SmtLib.deploy();
    await smtLib.waitForDeployment();
    this.enableLogging && this.log(`${contractName} deployed to:  ${await smtLib.getAddress()}`);

    return smtLib.getAddress();
  }

  async getDefaultIdType(): Promise<{defaultIdType: number, chainId: number}> {
    const chainId = parseInt(await network.provider.send('eth_chainId'), 16);
    const defaultIdType = chainIdDefaultIdTypeMap.get(chainId);
    if (!defaultIdType) {
      throw new Error(`Failed to find defaultIdType in Map for chainId ${chainId}`);
    }
    return { defaultIdType, chainId };
  }

  private log(...args: any): void {
    this.enableLogging && console.log(args);
  }
}