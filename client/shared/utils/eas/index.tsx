import {
  EAS,
  Offchain,
  SchemaEncoder,
  SchemaRegistry,
} from "@ethereum-attestation-service/eas-sdk";
import {JsonRpcProvider} from "@ethersproject/providers";
import {ethers} from "ethers";

const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

export const getEas = (provider: JsonRpcProvider) => {
  const eas = new EAS(EASContractAddress);

  eas.connect(provider);
  return eas;
};

export const getAttestation = async (provider: JsonRpcProvider, uid: string) => {
  const eas = getEas(provider);

  return await eas.getAttestation(uid);
};

export const createAttestation = async (
  provider: JsonRpcProvider,
  data: {
    imageHash: string;
    hashSignature: string;
  }
) => {
  const eas = getEas(provider);
  const schemaEncoder = new SchemaEncoder("uint256 eventId, uint8 voteIndex");
  const encodedData = schemaEncoder.encodeData([
    {name: "imageHash", value: data.imageHash, type: "uint256"},
    {name: "voteIndex", value: 1, type: "uint8"},
  ]);

  const schemaUID = "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995";

  const tx = await eas.attest({
    schema: schemaUID,
    data: {
      recipient: "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165",
      expirationTime: 0,
      revocable: true,
      data: encodedData,
    },
  });

  const newAttestationUID = await tx.wait();

  console.log("New attestation UID:", newAttestationUID);
};
