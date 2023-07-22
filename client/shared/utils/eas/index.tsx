import {EAS, SchemaEncoder} from "@ethereum-attestation-service/eas-sdk";
import {TransactionResponse} from "@ethersproject/providers";
import {ethers, Signer} from "ethers";
import {getEthersProvider} from "../metamask";
import SRAbi from "./SchemaRegistryAbi.json";

const SCHEMA_REGISTRY = "0x5d29f5Bd870815147Bd008FFfbDdfE269C25E094"; //mumbai
const EAS_ADDRESS = "0x2cDc1DDe90125Dd4E43C61247dF8892Ee15327Ce"; //mumbai

export const getEas = (provider: Signer) => {
  const eas = new EAS(EAS_ADDRESS);

  eas.connect(provider);
  return eas;
};

export const getSchemaRegistry = (provider: Signer) => {
  const contract = new ethers.Contract(SCHEMA_REGISTRY, SRAbi, provider);

  return contract;
};

export const getAttestation = async (uid: string) => {
  const provider = (await getEthersProvider()).getSigner();
  const eas = getEas(provider);

  return await eas.getAttestation(uid);
};

export const getPublishAttestationEncoder = () => {
  return new SchemaEncoder("bytes32 imageHash, bytes signature, address account");
};

export const publishAttestationObject = (data: {
  imageHash: string;
  signature: string;
  account: string;
}) => {
  const schemaEncoder = getPublishAttestationEncoder();
  const encodedData = schemaEncoder.encodeData([
    {name: "imageHash", value: data.imageHash, type: "bytes32"},
    {name: "signature", value: data.signature, type: "bytes"},
    {name: "account", value: data.account, type: "address"},
  ]);

  const schemaUID = "0x5ece2b3eabf8b7b4613691e4f2a62e64fe3e52be01c8a2e0c68291b0eb8da26e";

  return {
    schema: schemaUID,
    data: {
      recipient: data.account,
      expirationTime: 0,
      revocable: true,
      refUID: ethers.constants.HashZero,
      data: encodedData,
      value: 0,
    },
  };
};

export const getModificationAttestationEncoder = () => {
  return new SchemaEncoder("bytes32 imageHash, bytes signature, uint256[] proof, address account");
};

export const modificationAttestationObject = (data: {
  newImageHash: string;
  signature: string;
  account: string;
  proof: string[];
}) => {
  const schemaEncoder = getModificationAttestationEncoder();
  const encodedData = schemaEncoder.encodeData([
    {name: "imageHash", value: data.newImageHash, type: "bytes32"},
    {name: "signature", value: data.signature, type: "bytes"},
    {name: "proof", value: data.proof, type: "uint256[]"},
    {name: "account", value: data.account, type: "address"},
  ]);

  const schemaUID = "0x9da78eea0198965f668125297e478b413e0333829cbbb95812cc8eb2806a66e8";

  return {
    schema: schemaUID,
    data: {
      recipient: data.account,
      expirationTime: 0,
      revocable: true,
      refUID: ethers.constants.HashZero,
      data: encodedData,
      value: 0,
    },
  };
};

export const getAttestationUID = async (transaction: TransactionResponse) => {
  const tx = await transaction.wait();
  const eas = getEas((await getEthersProvider()).getSigner()).contract;

  const events = tx?.logs
    .map((log) => {
      const topics = [...log.topics];
      try {
        return eas.interface.parseLog({topics, data: log.data});
      } catch (error) {
        return null; // Log is not from this contract
      }
    })
    .filter((event) => event !== null);

  const uid = events.find((ev) => ev.name === "Attested").args[2];
  return uid as string;
};
