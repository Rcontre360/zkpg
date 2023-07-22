import hre from "hardhat";

const Operators = {
    NOOP : 0, // No operation, skip query verification in circuit
    EQ : 1, // equal
    LT : 2, // less than
    GT : 3, // greater than
    IN : 4, // in
    NIN : 5, // not in
    NE : 6   // not equal
}
  
async function main() {

    // you can run https://go.dev/play/p/rnrRbxXTRY6 to get schema hash and claimPathKey using YOUR schema
    const schemaBigInt = "129473305816334003586574039462315333728"

    // merklized path to field in the W3C credential according to JSONLD  schema e.g. birthday in the KYCAgeCredential under the url "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld"
    const schemaClaimPathKey = "19253087267225512054087054450359802493046666380431697502085604877885647817511"

    const requestId = 1;

    const query = {
        schema: schemaBigInt,
        claimPathKey  : schemaClaimPathKey,
        operator: Operators.EQ, // operator
        value: [1, ...new Array(63).fill(0).map(i => 0)], // for operators 1-3 only first value matters
    };

    // add the address of the contract just deployed
    const verifierAddress = "0x4dDD05E0667F9098f958722AFeEA61565e4653e6"

    let verifierContract = await hre.ethers.getContractAt("ZKPG", verifierAddress)

    const validatorAddress = "0xF2D4Eeb4d455fb673104902282Ce68B9ce4Ac450"; // sig validator
    // const validatorAddress = "0x3DcAe4c8d94359D31e4C89D7F2b944859408C618"; // mtp validator

    try {
        await verifierContract.setZKPRequest(
            requestId,
            validatorAddress,
            query.schema,
            query.claimPathKey,
            query.operator,
            query.value
        );
        console.log("Request set");
    } catch (e) {
        console.log("error: ", e);
    }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
  