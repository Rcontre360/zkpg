# zKPG
Descentralized audivisual content authenticity validation using zero knowledge proofs, user validation and attestations.

![My Image](./KZPG.drawio.png)

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

We have many utility contracts, including many libraries inherited from the [idem3](https://github.com/iden3/contracts) suite for implementing all the necessary components for the identitys from Polygon ID.

- `zKPG.sol`: Main contract for the protocol. It includes the logic for the creation of the claims, the validation of the claims and the attestation of the claims. We are inheriting from the  protocol. In addition to a Plonk verifier to check the ZK proofs and sends attestations to the Ethereum Attestation Service.

