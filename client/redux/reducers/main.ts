import {createReducer} from "@reduxjs/toolkit";
import * as actions from "@redux/actions";
import {Attestation} from "@ethereum-attestation-service/eas-sdk";

// Define the DAO state type
type State = {
    attestations: {
        type: "publish" | "modify";
        data: any;
    }[];
};

// Define the initial state
const initialState: State = {
    attestations: [
        {
            type: "publish",
            data: [
                {
                    name: "imageHash",
                    type: "bytes32",
                    signature: "bytes32 imageHash",
                    value: {
                        name: "imageHash",
                        type: "bytes32",
                        value: "0x6c97fd88e6894649e73fc47f5000b40b6c0d148f9edaeed3e88842b9e701eb57",
                    },
                },
                {
                    name: "signature",
                    type: "bytes",
                    signature: "bytes signature",
                    value: {
                        name: "signature",
                        type: "bytes",
                        value: "0x8d87d2dacca8c505359c8fa6492d3e7ff4efe67d0f0c9f284af585a77a12e6d81a25687c4420bb9531b5c21bb4c32fb5ded8e704037ac073ab8878c97b8d67c71b",
                    },
                },
                {
                    name: "account",
                    type: "address",
                    signature: "address account",
                    value: {
                        name: "account",
                        type: "address",
                        value: "0xefe4F346AE1A4E69953688B3f911E0aE22c0dbc0",
                    },
                },
            ],
        },
        {
            type: "modify",
            data: [
                {
                    name: "imageHash",
                    type: "bytes32",
                    signature: "bytes32 imageHash",
                    value: {
                        name: "imageHash",
                        type: "bytes32",
                        value: "0x4f7a3b9832c86b393cd002ca9608df87306a651fa2a3e46f0179e865acd3cf74",
                    },
                },
                {
                    name: "signature",
                    type: "bytes",
                    signature: "bytes signature",
                    value: {
                        name: "signature",
                        type: "bytes",
                        value: "0xed97d76783090d31e97ea458ffa553208f348075cfdbfe0c67c490f873d8546b742fae6da32cfe1be899de60c675b072bee55774e87c4c2f260c3a70b6cba76a1b",
                    },
                },
                {
                    name: "proof",
                    type: "uint256[]",
                    signature: "uint256[] proof",
                    value: {
                        name: "proof",
                        type: "uint256[]",
                        value: [
                            {
                                type: "BigNumber",
                                hex: "0x0e51868efa8c8aa5a29efc62cf60cb68858dd90cedc4077d8a35bfe4658df67c",
                            },
                            {
                                type: "BigNumber",
                                hex: "0x2721581c253ca7928bc346ea13d0f2b216372470d69d55c055c202055c55b2b6",
                            },
                            {
                                type: "BigNumber",
                                hex: "0x2181bfd328bf7a6010ff39b7357fec845a72e9e195a65fac5b856f73d0a073e5",
                            },
                            {
                                type: "BigNumber",
                                hex: "0x18bfb43db7a51367a1f8c5a0c7f130500005c2e11ff6023a0fd8dba4ef6cc5be",
                            },
                            {
                                type: "BigNumber",
                                hex: "0x15cf75c52b4f5693b9193e0bb4a1f2aedacea7ca6fee0bbeaf6503246d4ebb28",
                            },
                            {
                                type: "BigNumber",
                                hex: "0x1c646fc6c6dae65373af074cc074e1d3c6c84259a4760534a9691e0cebed610c",
                            },
                            {
                                type: "BigNumber",
                                hex: "0x0c859d42934d53e1242c72ce9e7158dd59467585c7de5c2b205eaf5d42ea3801",
                            },
                            {
                                type: "BigNumber",
                                hex: "0x2c57e149522429e90108d377523ae49634700710ba39e06b981ad1ba7a5648b3",
                            },
                            {
                                type: "BigNumber",
                                hex: "0x1908a809fd0fb595c50616c511f5bcda1075148a9e7cd5fb2403c4ca723c539d",
                            },
                            {
                                type: "BigNumber",
                                hex: "0x08f2ccffeb9a676086d34adb67384db4a0ef65afbcb487de2e358cf9bd2068cd",
                            },
                            {
                                type: "BigNumber",
                                hex: "0x171153e321b39754193a304337530a38c87f7fcc4cb289ada750ae129dea1e33",
                            },
                            {
                                type: "BigNumber",
                                hex: "0x079f4f73c62a7fde43735a5c6910d4cb5cc246854b1902664e03ea39908aa497",
                            },
                            {
                                type: "BigNumber",
                                hex: "0x04ebdea81e2f9fc4ea9b92ef7442afa255566da5cacd1581ea8de2a0065027d8",
                            },
                            {
                                type: "BigNumber",
                                hex: "0x0ad7ebb98f585f04c29081d1f030702af4f0697460912c9d9d89a2eb768728b3",
                            },
                            {
                                type: "BigNumber",
                                hex: "0x076ffd2dd6ebaacd59918243e28f31e5da1adb7281115a4966e5182a7ac751ad",
                            },
                            {
                                type: "BigNumber",
                                hex: "0x176aadab608c1f04f3ee07ba277b6c6eff8fcad5ac27600837f677a6b1e52826",
                            },
                            {
                                type: "BigNumber",
                                hex: "0x117ca706ba4a65a7867a3c1be2a7b6f6582407ee5ebf709c842f94b8e3686da1",
                            },
                            {
                                type: "BigNumber",
                                hex: "0x14c6b286ccfc40c9fcfab72204312d5ddb913fc30ba8a690acbb573497d6d58d",
                            },
                            {
                                type: "BigNumber",
                                hex: "0x08d686efc9feca2527f8001471af8d1bfe9b4f7699c58bf50a240e70f1e9f1df",
                            },
                            {
                                type: "BigNumber",
                                hex: "0x0e32016d2c0a26c43cbd1b3c4338e8e978b59518ea26fa7b65ae4140563f62b1",
                            },
                            {
                                type: "BigNumber",
                                hex: "0x140c3e6c00d907cadfd49374b8021ded3cfc563576399fa4b44b9b0542539409",
                            },
                            {
                                type: "BigNumber",
                                hex: "0x09005a10245d6ddc12be47c9ea972182fe46fde2bfabd3efa4ab5609ac532862",
                            },
                            {
                                type: "BigNumber",
                                hex: "0x1cfd7251cf75abd03e899530f5302697cf8103343b1c2e686a663cf453dd3e8c",
                            },
                            {
                                type: "BigNumber",
                                hex: "0x28b2b4cc364214ed387eacf96e8999b35fc908f149a0f17c88b18d43bad0cba2",
                            },
                        ],
                    },
                },
                {
                    name: "account",
                    type: "address",
                    signature: "address account",
                    value: {
                        name: "account",
                        type: "address",
                        value: "0xefe4F346AE1A4E69953688B3f911E0aE22c0dbc0",
                    },
                },
            ],
        },
    ],
};

// Define the reducer
export const main = createReducer(initialState, (builder) => {
    builder.addCase(actions.onAddPublishAttestation.fulfilled, (state: State, action) => {
        if (!action.payload) return;
        state.attestations.push(action.payload);
    });

    builder.addCase(actions.onAddModifyAttestation.fulfilled, (state: State, action) => {
        if (!action.payload) return;
        state.attestations.push(action.payload);
    });
});
