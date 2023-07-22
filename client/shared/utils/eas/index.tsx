import {EAS, SchemaEncoder, ZERO_BYTES} from "@ethereum-attestation-service/eas-sdk";
import {ethers, Signer} from "ethers";

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

export const publishAttestationObject = (data: {
  imageHash: string;
  signature: string;
  account: string;
}) => {
  const schemaEncoder = new SchemaEncoder("bytes32 imageHash, bytes signature, address account");
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

export const modificationAttestationObject = (data: {
  newImageHash: string;
  signature: string;
  account: string;
  proof: string[];
}) => {
  const schemaEncoder = new SchemaEncoder(
    "bytes32 imageHash, bytes signature, uint256[] proof, address account"
  );
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
