# zKPG

Descentralized audivisual content authenticity validation using zero knowledge proofs, user validation and attestations.

![My Image](./KZPG.drawio.png)

# zKPG

Descentralized audivisual content authenticity validation using zero knowledge proofs, user validation and attestations.

## Content

### Circuits

Circom circuits to verify computation. The computation verified is image changes:

- Gray scale
- Resizing
- Croping

### Claims

Small golang library to generate the merklized path to the field verified from the claim.

### Contracts

Smart contracts for the ZKPG protocol. Includes the following contracts:

- `zKPG.sol`: Main contract for the protocol. It includes the logic for the creation of the claims, the validation of the claims and the attestation of the claims. Uses a Plonk verifier to check the ZK proofs and sends attestations to the Ethereum Attestation Service.
