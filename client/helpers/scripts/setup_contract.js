import { SigningArchwayClient } from "@archwayhq/arch3.js";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import "dotenv/config";
import * as base64js from "base64-js";
import fs from "fs";

async function upload(signingClient, accountAddress) {
  // Upload a contract
  const wasmFilePath = "/home/isak/projects/chelofi/contracts/multisig/artifacts/multisig.wasm";
  const wasmCode = fs.readFileSync(
    wasmFilePath
  );

  const encoded = Buffer.from(wasmCode, "binary").toString("base64");
  const contractData = base64js.toByteArray(encoded);

  const uploadResult = await signingClient.upload(
    accountAddress,
    contractData,
    "auto",
    ""
  );

  if (uploadResult.code !== undefined && uploadResult.code !== 0) {
    console.log("Storage failed:", uploadResult.log || uploadResult.rawLog);
  } else {
    console.log("Storage successful:", uploadResult.transactionHash);
  }

  const codeId = uploadResult.codeId;
  return codeId;
}

async function instantiate(signingClient) {
  const beneficiaryAddress = process.env.BENEFICIARY_ADDRESS;
  const msg = { verifier: accountAddress, beneficiary: beneficiaryAddress };
  const instantiateOptions = {
    memo: "Instantiating a new contract",
    funds: [
      {
        denom: "aconst",
        amount: "1000000000000000000",
      },
    ],
    admin: accounts[0].address,
  };

  const instantiateResult = await signingClient.instantiate(
    accountAddress,
    codeId,
    msg,
    "multisig-alpha",
    "auto",
    instantiateOptions
  );

  if (instantiateResult.code !== undefined && instantiateResult.code !== 0) {
    console.log(
      "Instantiation failed:",
      instantiateResult.log || instantiateResult.rawLog
    );
  } else {
    console.log("Instantiation successful:", instantiateResult.transactionHash);
  }

  return instantiateResult.contractAddress;
}

async function main(){
  const network = {
    chainId: "constantine-3",
    endpoint: "https://rpc.constantine.archway.tech",
    prefix: "archway",
  };

  const mnemonic = process.env.MNEMONIC;
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: network.prefix,
  });
  const signingClient = await SigningArchwayClient.connectWithSigner(
    network.endpoint,
    wallet
  );

  const accounts = await wallet.getAccounts();
  const accountAddress = accounts[0].address;


  // UPLOAD
  const codeID = await upload(signingClient, accountAddress);
  console.log(codeID);

  // INSTANTIATE
  // const contractAddress = await instantiate(codeID);
  // console.log(contractAddress);
}

main();
