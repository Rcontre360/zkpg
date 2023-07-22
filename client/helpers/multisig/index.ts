import {getOfflineSigner} from "@cosmostation/cosmos-client";
import {SigningCosmWasmClient} from "@cosmjs/cosmwasm-stargate";
import "dotenv/config";

export const getClient = async (chainId: string, rpc: string) => {
  const offlineSigner = await getOfflineSigner(chainId);
  const client = await SigningCosmWasmClient.connectWithSigner(rpc, offlineSigner);
  const accounts = await offlineSigner.getAccounts();

  return {
    client,
    accounts,
  };
};

//const network = {  chainId: 'constantine-3',  endpoint: 'https://rpc.constantine.archway.tech',  prefix: 'archway',}
export const proposeTransaction = async (args: {
  multisig: string;
  msgs: any;
  network: {chainId: string; rpc: string};
  provider: any;
}) => {
  const {multisig, msgs, network} = args;
  const {client, accounts} = await getClient(network.chainId, network.rpc);

  const {events, transactionHash} = await client.execute(
    accounts[0].address,
    multisig,
    {
      propose_transaction: {
        msgs,
      },
    },
    "auto"
  );

  let transaction = events
    .filter((i: any) => i.type === "wasm")[0]
    .attributes.filter((i: any) => i.key === "tx_id")[0];
  console.log("Transaction ", transaction);
  console.log("Transaction Hash: ", transactionHash);
};
