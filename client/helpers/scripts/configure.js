
import { SigningArchwayClient } from '@archwayhq/arch3.js';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';

const contractAddress = 'set-this';
const network = {  chainId: 'constantine-3',  endpoint: 'https://rpc.constantine.archway.tech',  prefix: 'archway',}

const mnemonic = '';
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: network.prefix });
const accounts = await wallet.getAccounts();

const tx_client = await SigningArchwayClient.connectWithSigner(network.endpoint, wallet);
const configure_msg = { configure_multisig: {
  members: [
    "address1",
    "address2"
  ],
  min_approval: 2
  } 
};


const { transactionHash } = await tx_client.execute(  accounts[0].address,  contractAddress,  configure_msg,  "auto");

console.log("Transaction Hash: ", transactionHash);
