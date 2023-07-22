import { SigningArchwayClient } from '@archwayhq/arch3.js';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import BigNumber from "bignumber.js";
import 'dotenv/config';

// CONFIGURE CONTRACT ADDRESS AND BANKMSG RECEIVER ADDRESS
const contractAddress = process.env.CONTRACT_ADDR;
const receiverAddr = process.env.RECEIVER_ADDR;
const mnemonic = process.env.MNEMONIC;
console.log("contractAddress", contractAddress);

const network = {  chainId: 'constantine-3',  endpoint: 'https://rpc.constantine.archway.tech',  prefix: 'archway',}
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: network.prefix });
const accounts = await wallet.getAccounts();

const tx_client = await SigningArchwayClient.connectWithSigner(network.endpoint, wallet);
const txId = "set-this";
const approveMsg = {
  approve_transaction: txId
};

const { transactionHash } = await tx_client.execute(  accounts[0].address,  
        contractAddress,  
        approveMsg,  
        "auto");


console.log("Transaction Hash: ", transactionHash);
