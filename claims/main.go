// You can edit this code!
// Click here and start typing.
package main

import (
	"fmt"
	"log"

	"github.com/iden3/go-schema-processor/merklize"
	"github.com/iden3/go-schema-processor/utils"
)

const (
	jsonLDContext = "ipfs://QmQMQwzqu4vr7D8J4WPaWdbCgRyNzepxjTcU6ngrd1xxRj" // JSONLD schema for credential
	typ           = "Publisher"                                             // credential type
	fieldName     = "isValid"                                               // field name in form of field.field2.field3 field must be present in the credential subject
	schemaJSONLD  = `{
		"@context": [
		  {
			"@protected": true,
			"@version": 1.1,
			"id": "@id",
			"type": "@type",
			"Publisher": {
			  "@context": {
				"@propagate": true,
				"@protected": true,
				"polygon-vocab": "urn:uuid:65b52463-4be2-466a-ba6e-3ff12e5b5d6b#",
				"xsd": "http://www.w3.org/2001/XMLSchema#",
				"isValid": {
				  "@id": "polygon-vocab:isValid",
				  "@type": "xsd:double"
				},
				"issuanceDate": {
				  "@id": "polygon-vocab:issuanceDate",
				  "@type": "xsd:double"
				},
				"issuerProof": {
				  "@id": "polygon-vocab:issuerProof",
				  "@type": "xsd:string"
				},
				"issuerType": {
				  "@id": "polygon-vocab:issuerType",
				  "@type": "xsd:double"
				}
			  },
			  "@id": "urn:uuid:92188cbc-b1d8-4872-98f4-27373e087c94"
			}
		  }
		]
	}`
)

func main() {

	// content of json ld schema

	schemaID := fmt.Sprintf("%s#%s", jsonLDContext, typ)
	querySchema := utils.CreateSchemaHash([]byte(schemaID))
	fmt.Println("schema hash")
	fmt.Println(querySchema.BigInt().String())
	path, err := merklize.NewFieldPathFromContext([]byte(schemaJSONLD), typ, fieldName)
	if err != nil {
		log.Fatal(err)
	}
	err = path.Prepend("https://www.w3.org/2018/credentials#credentialSubject")
	if err != nil {
		log.Fatal(err)
	}
	mkPath, err := path.MtEntry()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("claim path key")
	fmt.Println(mkPath.String())
}
