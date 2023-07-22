// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./verifiers/ZKPVerifier.sol";
import "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";

interface PlonkVerifier {
    function verifyProof(
        uint256[24] calldata _proof,
        uint256[1] calldata _pubSignals
    ) external view returns (bool);
}

contract ZKPG is ZKPVerifier {
    event SuccessfulProof(
        uint256 requestId,
        uint256 challengeIndex,
        address indexed sender,
        uint256 indexed timestamp
    );

    uint64 public constant TRANSFER_REQUEST_ID = 1;
    bool public mock;
    IEAS eas;

    mapping(uint256 => address) public idToAddress;
    mapping(address => uint256) public addressToId;

    constructor(address _easAddress) {
        eas = IEAS(_easAddress);
    }

    function updateMock(bool _mock) public {
        mock = _mock;
    }

    function _beforeProofSubmit(
        uint64 /* requestId */,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal view override {
        // check that the challenge input of the proof is equal to the msg.sender
        address addr = GenesisUtils.int256ToAddress(inputs[validator.getChallengeInputIndex()]);
        require(_msgSender() == addr, "address in the proof is not a sender address");
    }

    function _afterProofSubmit(
        uint64 requestId,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal override {
        address sender = _msgSender();

        require(
            requestId == TRANSFER_REQUEST_ID && addressToId[sender] == 0,
            "proof can not be submitted more than once"
        );

        uint256 id = inputs[validator.getChallengeInputIndex()];
        idToAddress[id] = sender;
    }

    function publishAttestation(
        AttestationRequest calldata request
    ) external payable returns (bool) {
        require(
            proofs[msg.sender][TRANSFER_REQUEST_ID] == true || mock,
            "only identities who provided proof are allowed to be registered."
        );

        eas.attest(request);

        return true;
    }

    function modificationAttestation(
        AttestationRequest calldata request,
        PlonkVerifier verifier,
        uint256[24] calldata proof,
        uint256[1] calldata pubSignals
    ) external payable returns (bool) {
        bool isValidModification = verifier.verifyProof(proof, pubSignals);
        require(isValidModification, "invalid image modification");

        eas.attest(request);

        return true;
    }
}
