import {
  EAS,
  Offchain,
  SchemaEncoder,
  SchemaRegistry,
} from "@ethereum-attestation-service/eas-sdk";
import {JsonRpcProvider} from "@ethersproject/providers";
import {Signer} from "ethers";

const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

export const getEas = (provider: Signer) => {
  const eas = new EAS(EASContractAddress);

  eas.connect(provider);
  return eas;
};

export const getAttestation = async (provider: Signer, uid: string) => {
  const eas = getEas(provider);

  return await eas.getAttestation(uid);
};

export const createAttestation = async (
  provider: Signer,
  data: {
    imageHash: string;
    signature: string;
    account: string;
  }
) => {
  const eas = getEas(provider);
  const schemaEncoder = new SchemaEncoder("bytes32 imageHash, bytes signature, address account");
  console.log([
    {name: "imageHash", value: data.imageHash, type: "bytes32"},
    {name: "signature", value: data.signature, type: "bytes"},
    {name: "account", value: data.account, type: "address"},
  ]);
  const encodedData = schemaEncoder.encodeData([
    {name: "imageHash", value: data.imageHash, type: "bytes32"},
    {name: "signature", value: data.signature, type: "bytes"},
    {name: "account", value: data.account, type: "address"},
  ]);

  const schemaUID = "0x5ece2b3eabf8b7b4613691e4f2a62e64fe3e52be01c8a2e0c68291b0eb8da26e";
  console.log("HERE");

  const tx = await eas.attest({
    schema: schemaUID,
    data: {
      recipient: data.account,
      expirationTime: 0,
      revocable: true,
      data: encodedData,
    },
  });

  //console.log("tx.wait");
  //const newAttestationUID = await tx.wait();

  //console.log("New attestation UID:", newAttestationUID);
};
