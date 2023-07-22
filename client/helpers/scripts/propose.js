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

let amount = new BigNumber(1);
amount = amount.multipliedBy(new BigNumber('1e18'));

const amountFinal = {
    denom: 'aconst',
    amount: amount.toString(),
};
console.log(amountFinal);

const proposeMsg = {
  propose_transaction: {
    msgs: [
            {
              bank: {
                send: {
                  amount: [ amountFinal ],
                  to_address: receiverAddr
                } 
              }
            }
          ]
    }
};

const { events, transactionHash } = await tx_client.execute(  accounts[0].address,  
        contractAddress,  
        proposeMsg,  
        "auto");

let transaction = events.filter( i => i.type === "wasm" )[0].attributes.filter( i => i.key === "tx_id")[0];
console.log("Transaction ", transaction);
console.log("Transaction Hash: ", transactionHash);

// NOTE:
// Get the transaction id to be used for approve.js and execute.js
// Check tx_id from response -> events -> type: wasm -> attributes -> key: tx_id
