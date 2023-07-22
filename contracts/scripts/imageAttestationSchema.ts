import {Signer, TransactionReceipt, TransactionResponse, ZeroAddress} from "ethers";
import {ethers} from "hardhat";
import SRAbi from "./schema_registry_abi.json";

const SCHEMA_REGISTRY = "0x5d29f5Bd870815147Bd008FFfbDdfE269C25E094"; //mumbai
const EAS = "0x2cDc1DDe90125Dd4E43C61247dF8892Ee15327Ce"; //mumbai

const getSchemaRegistry = (provider: Signer) => {
  const contract = new ethers.Contract(SCHEMA_REGISTRY, SRAbi, provider);

  return contract;
};

const publishSchema = async () => {
  const [signer] = await ethers.getSigners();
  console.log("AAA");
  const schemaRegistry = getSchemaRegistry(signer);

  const schema = "bytes32 imageHash, bytes signature, address account";
  const resolverAddress = ZeroAddress;
  console.log("HERE");
  const revocable = true;
  console.log("THERE");
  const transaction: TransactionResponse = await schemaRegistry.register(
    schema,
    resolverAddress,
    revocable
  );

  console.log("TURURUR");
  const tx = await transaction.wait();

  const events = tx?.logs
    .map((log) => {
      const topics = [...log.topics];
      try {
        return schemaRegistry.interface.parseLog({topics, data: log.data});
      } catch (error) {
        return null; // Log is not from this contract
      }
    })
    .filter((event) => event !== null);

  const args = events.find((ev) => ev.name === "Registered").args[0];
  console.log(`TX: ${tx?.hash} . UID: ${args}`);
  console.log(events);
};

//UID: 0x5ece2b3eabf8b7b4613691e4f2a62e64fe3e52be01c8a2e0c68291b0eb8da26e
//account: mine
//
const modifyImageSchema = async () => {
  const [signer] = await ethers.getSigners();
  const schemaRegistry = getSchemaRegistry(signer);

  const schema = "bytes32 imageHash, bytes signature, uint256[] proof, address account";
  const resolverAddress = ZeroAddress;
  const revocable = true;
  const transaction: TransactionResponse = await schemaRegistry.register(
    schema,
    resolverAddress,
    revocable
  );

  console.log("TURURUR");
  const tx = await transaction.wait();

  const events = tx?.logs
    .map((log) => {
      const topics = [...log.topics];
      try {
        return schemaRegistry.interface.parseLog({topics, data: log.data});
      } catch (error) {
        return null; // Log is not from this contract
      }
    })
    .filter((event) => event !== null);

  const args = events.find((ev) => ev.name === "Registered").args[0];
  console.log(`TX: ${tx?.hash} . UID: ${args}`);
  console.log(events);
};

//uid 0x9da78eea0198965f668125297e478b413e0333829cbbb95812cc8eb2806a66e8

modifyImageSchema()
  .then(() => console.log("YAY"))
  .catch((err) => console.log("fuck...: ", err.message));
