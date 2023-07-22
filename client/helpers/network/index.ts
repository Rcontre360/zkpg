type NetworkConfig = {
  isActive: boolean;
  provider: string;
  providerWs: string;
  addresses: {
    factory: string;
    registry: string;
    token: string;
    comp: string;
    timelock: string;
    govBravo: string;
    mockToken: string;
  };
  endpoints: {
    chelo: string;
    explorer: string;
    chelo_aragon?: string;
    syndicate?: string;
    aragon?: string;
  };
  settings: {
    chainId: number;
    logo: string;
    currency: string;
    name: string;
    moralis_name: string;
    explorer: string;
    testnet: boolean;
    live: boolean;
  };
  ipfs: {
    gateway: string;
  };
};

export type NetworkName = "ethereum" | "goerli" | "polygon" | "mumbai" | "hardhat";

export const networkConfigs: Record<NetworkName, NetworkConfig> = {
  ethereum: {
    isActive: false,
    provider: "",
    providerWs: "",
    addresses: {
      factory: "",
      registry: "",
      token: "",
      comp: "",
      timelock: "",
      govBravo: "",
      mockToken: "",
    },
    endpoints: {
      chelo: null,
      explorer: `https://api.etherscan.com/api?apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_KEY}`,
      aragon: null,
    },
    settings: {
      logo: "/multimedia/networks/eth.png",
      name: "Ethereum",
      currency: "ETH",
      moralis_name: "eth",
      explorer: "https://etherscan.io/",
      chainId: 1,
      testnet: false,
      live: true,
    },
    ipfs: {
      gateway: "https://ipfs.eth.aragon.network/ipfs",
    },
  },
  goerli: {
    isActive: false,
    provider: `https://eth-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_GOERLI_PROVIDER}`,
    providerWs: `wss://eth-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_GOERLI_PROVIDER}`,
    addresses: {
      factory: "",
      registry: "",
      token: "",
      comp: "",
      timelock: "",
      govBravo: "",
      mockToken: "",
    },
    endpoints: {
      chelo: "https://api.thegraph.com/subgraphs/name/rcontre360/talent_subgraph",
      chelo_aragon: "https://api.thegraph.com/subgraphs/name/rcontre360/dao_subgraph",
      explorer: `https://api-goerli.etherscan.io/api?apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_KEY}`,
      aragon: null,
    },
    settings: {
      logo: "/multimedia/networks/eth.png",
      name: "Goerli",
      currency: "ETH",
      moralis_name: "eth",
      explorer: "https://etherscan.io/",
      chainId: 5,
      testnet: true,
      live: true,
    },
    ipfs: {
      gateway: "https://ipfs.eth.aragon.network/ipfs",
    },
  },
  polygon: {
    isActive: true,
    provider: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_POLYGON_PROVIDER}`,
    providerWs: `wss://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_POLYGON_PROVIDER}`,
    addresses: {
      factory: "0xd2fCEb07433DA8431599E78823a4DA93E19AeDb3",
      registry: "0xC06659800D44c541DeF62f4A2Ef11F7eA931a9dF",
      token: "0xdD906dfe4b0C5bDDf8e925567354180B488A755F",
      comp: "0x44eD308B84FCD4d8d8ca93511ECAD64d6C34d188",
      timelock: "0xD429880591D366ddf812a71FA3406D9d9659b2DD",
      govBravo: "0x41E6dC2CC382125c86D9DeDD31359f20785d7a42",
      mockToken: "",
    },
    endpoints: {
      chelo: "https://api.thegraph.com/subgraphs/name/rcontre360/talent_subgraph_production",
      explorer: `https://api.polygonscan.com/api?apikey=${process.env.NEXT_PUBLIC_POLYGOSCAN_KEY}`,
    },
    settings: {
      chainId: 137,
      logo: "/multimedia/networks/matic.svg",
      name: "Polygon",
      currency: "MATIC",
      moralis_name: "polygon",
      explorer: "https://polygonscan.com/",
      testnet: false,
      live: true,
    },
    ipfs: {
      gateway: "https://ipfs.eth.aragon.network/ipfs",
    },
  },
  mumbai: {
    isActive: true,
    provider: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_MUMBAI_PROVIDER}`,
    providerWs: `wss://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_MUMBAI_PROVIDER}`,
    addresses: {
      factory: "0xBE2092A947E10B5D0f4110D66D388329D9AD58eb",
      registry: "0xD313d7Db9eF01824a9Aee5A4ce06CFF098231Ea5",
      token: "0x2826511e2354bFE986B93a28FC9E9c478B21915d",
      comp: "0xf0853E3176F139214dab1D012de909dA38740985",
      timelock: "0xF9a55D4004149C592E3DE17922ED4c034562a6FF",
      govBravo: "0xE6C2d087f2E97b6b002537b09dF6A4D5F6bE9fa7",
      mockToken: "0xf156D47b1364f301395B2892C49fA16A0b157B69",
    },
    endpoints: {
      chelo: "https://api.thegraph.com/subgraphs/name/rcontre360/talent_subgraph",
      explorer: `https://api-testnet.polygonscan.com/api?apikey=${process.env.NEXT_PUBLIC_MUMBAI_KEY}`,
      aragon: null,
    },
    settings: {
      chainId: 80001,
      logo: "/multimedia/networks/matic.svg",
      name: "Mumbai",
      currency: "TMATIC",
      moralis_name: "mumbai",
      explorer: "https://mumbai.polygonscan.com/",
      testnet: true,
      live: true,
    },
    ipfs: {
      gateway: "https://ipfs.eth.aragon.network/ipfs",
    },
  },
  hardhat: {
    isActive: true,
    provider: "http://127.0.0.1:8545/",
    providerWs: "wss://127.0.0.1:8545/",
    addresses: {
      factory: "0xc0cC8430814995C7d5C28eaAeE41A7c24B727681",
      registry: "0x7AE799Fc0532Ff0C35aAf53875dFc647c9Af4b78",
      token: "0x9E1B23B6E8F1447345398A0ADBF5DdAbc1FD8190",
      comp: "0x73F328e66d83782eA60769Fc1165857b2a265Ef9",
      timelock: "0x5028E3D43487DAC3F564196F4B22fE639805f263",
      govBravo: "0xC4b7Bc78A490f089d458dB80c5Be00DB2e5FEAc7",
      mockToken: "0xDe9944A60400486B1D91ee70d69AcBB1B641D17e",
    },
    endpoints: {
      chelo: "http://localhost:8000/subgraphs/name/rcontre360/talent_subgraph",
      explorer: "",
      aragon: null,
    },
    settings: {
      chainId: 31337,
      logo: "/multimedia/networks/eth.png",
      name: "Hardhat",
      currency: "HETH",
      moralis_name: "mumbai",
      explorer: "http://127.0.0.1:8545/",
      testnet: true,
      live: true,
    },
    ipfs: {
      gateway: "",
    },
  },
};

//https://www.tally.xyz/gov/minitestchelo

const idToNetwork: Record<number, string> = {
  137: "polygon",
  80001: "mumbai",
  1: "ethereum",
  5: "goerli",
  31337: "hardhat",
};

export const SUPPORTED_CHAINS = Object.values(networkConfigs).map((conf) => conf.settings.chainId);

export function getNetworkConfig(networkId: number): NetworkConfig {
  return networkConfigs[idToNetwork[networkId]];
}
