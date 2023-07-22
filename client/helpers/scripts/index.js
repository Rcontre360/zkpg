import { ArchwayClient } from '@archwayhq/arch3.js';
import { SigningArchwayClient } from '@archwayhq/arch3.js';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import 'dotenv/config';

const client = await ArchwayClient.connect('https://rpc.constantine.archway.tech');
const contractAddress = process.env.CONTRACT_ADDR;
// Get members
const queryMembers = {  get_members: [],};
const { members } = await client.queryContractSmart(  contractAddress,  queryMembers);
console.log("Members: ", members);

// Get min approval
const minApprovalMsg = {  get_min_approval: [],};
const { count } = await client.queryContractSmart(  contractAddress,  minApprovalMsg);
console.log("Min Approval: ", count);

// Get is approved
const msg = {  get_is_approved: "tx_id_here" };
const { is_approved } = await client.queryContractSmart(  contractAddress,  msg);
console.log("Is Approved: ", is_approved);


