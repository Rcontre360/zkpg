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
	jsonLDContext = "ipfs://QmezxuGBkV9Co7bsGvK6Q2qFbit2ZNjvzVV9oNTAZLtKqr" // JSONLD schema for credential
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
				"polygon-vocab": "urn:uuid:01a602b7-3cd4-40b0-bcca-3e8fb9d6c5d8#",
				"xsd": "http://www.w3.org/2001/XMLSchema#",
				"userProof": {
				  "@id": "polygon-vocab:userProof",
				  "@type": "xsd:string"
				},
				"isValid": {
				  "@id": "polygon-vocab:isValid",
				  "@type": "xsd:integer"
				},
				"issuerType": {
				  "@id": "polygon-vocab:issuerType",
				  "@type": "xsd:integer"
				}
			  },
			  "@id": "urn:uuid:c1bd2680-d54a-43ec-92f6-0063d0812d95"
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
