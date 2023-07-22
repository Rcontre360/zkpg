import {onAddModifyAttestation} from "@redux/actions";
import {useAppDispatch} from "@redux/store";
import {getAttestationUID, modificationAttestationObject} from "@shared/utils/eas";
import {convertImageToMatrix, hashMatrix, ImageMatrix} from "@shared/utils/images";
import {sendModifyAttestation} from "@shared/utils/main";
import {getAccount, sign_message} from "@shared/utils/metamask";
import {calculateCropProof, CROP_VERIFIER} from "@shared/utils/zk";
import {useState} from "react";
import {ClipboardCopyIcon} from "@heroicons/react/solid";

export default function ProveModifications() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Cropping");
  const [proofs, setProofs] = useState({proof: [], publicSignals: []});
  const [originalMatrix, setOriginalMatrix] = useState<ImageMatrix>(null);
  const [modifiedMatrix, setModifiedMatrix] = useState<ImageMatrix>(null);
  const [names, setImageNames] = useState({first: "No file chosen", second: "No file chosen"});

  const handleOriginalImageChange = async (event) => {
    const file = event.target.files[0];
    const matrix = await convertImageToMatrix(file);
    setOriginalMatrix(matrix);

    // Crop the matrix to get the upper left quadrant
    const croppedMatrix = matrix.slice(0, 350).map((row) => row.slice(0, 350));
    setModifiedMatrix(croppedMatrix);

    setImageNames({
      first: file.name,
      second: `${file.name} cropped`,
    });
  };

  const handleModifiedImageChange = async (event) => {
    let matrix = await convertImageToMatrix(event.target.files[0]);
    // Ensure the matrix is cropped to 350x350
    matrix = matrix.slice(0, 350).map((row) => row.slice(0, 350));
    setModifiedMatrix(matrix);
  };

  const handleProveModifications = async () => {
    setLoading(true);
    try {
      const {result, solidityProof, publicSignals} = await calculateCropProof(
        originalMatrix,
        modifiedMatrix
      );
      //const cropVerifier = await getCropVerifier();
      //const finalResult = await cropVerifier.verifyProof(solidityProof, publicSignals);

      const newImageHash = hashMatrix(modifiedMatrix);
      const imageSign = await sign_message(newImageHash);
      const account = await getAccount();

      const modificationObject = modificationAttestationObject({
        newImageHash,
        signature: imageSign,
        account,
        proof: solidityProof,
      });
      setProofs({proof: solidityProof, publicSignals});

      const uid = await getAttestationUID(
        await sendModifyAttestation(modificationObject, CROP_VERIFIER, solidityProof, publicSignals)
      );

      dispatch(onAddModifyAttestation({uid}));
    } catch (err) {
      console.log("err", err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen text-white flex p-8">
      {/* Options on the left */}
      <div className="flex-none w-1/4 space-y-4 pr-8">
        <h1 className="text-2xl font-bold mb-4">Prove changes of an image</h1>
        <button
          onClick={() => setSelectedOption("Cropping")}
          className={`block w-full text-left p-4 rounded flex justify-between ${selectedOption === "Cropping" ? "bg-gray-700" : ""
            }`}
        >
          Cropping <span className="badge bg-violet-800 text-xs px-2 py-1 ml-2">Cropped image</span>
        </button>
        <button
          onClick={() => setSelectedOption("Grayscaling")}
          className={`block w-full text-left p-4 rounded flex justify-between ${selectedOption === "Grayscaling" ? "bg-gray-700" : ""
            }`}
        >
          Grayscaling{" "}
          <span className="badge bg-violet-800 text-xs px-2 py-1 ml-2">Grayscaled image</span>
        </button>
        <button
          onClick={() => setSelectedOption("Resizing")}
          className={`block w-full text-left p-4 rounded flex justify-between ${selectedOption === "Resizing" ? "bg-gray-700" : ""
            }`}
        >
          Resizing
          <span className="badge bg-violet-800 text-xs px-2 py-1 ml-2">Resized image</span>
        </button>
      </div>

      {/* Image inputs in the center */}
      <div className="flex-1 space-y-4">
        <div className="border-dashed relative border-2 border-gray-600 p-4 h-1/3">
          <input
            type="file"
            accept="image/*"
            className="w-full h-full bg-gray-800 p-2 rounded"
            onChange={handleOriginalImageChange}
          />
          <p className="text-center mt-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {names.first}
          </p>
        </div>
        <div className="border-dashed relative border-2 border-gray-600 p-4 h-1/3">
          <input
            type="file"
            accept="image/*"
            className="w-full h-full bg-gray-800 p-2 rounded"
            onChange={handleModifiedImageChange}
          />
          <p className="text-center mt-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {names.second}
          </p>
        </div>
        <button
          onClick={handleProveModifications}
          className="bg-violet-700 hover:bg-violet-800 px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Processing..." : "Prove"}
        </button>
      </div>

      {/* Metadata on the right */}
      <div className="flex-none w-1/4 space-y-4 pl-8">
        <h2 className="text-xl font-bold">Proof</h2>
        <div className="border border-gray-600 p-4 rounded">
          <div className="h-64 overflow-scroll no-scrollbar">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Proof:</h3>
              <button
                onClick={() => navigator.clipboard.writeText(proofs.proof.join(", "))}
                title="Copy ZK proof"
                className="p-1 hover:bg-gray-700 rounded"
              >
                <ClipboardCopyIcon className="h-5 w-5" />
              </button>
            </div>
            <ul>
              {proofs.proof.map((proof, index) => (
                <li key={index} className="break-all">
                  {proof}
                </li>
              ))}
            </ul>
          </div>
          <div className="h-64 overflow-scroll no-scrollbar">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Public signals:</h3>
              <button
                onClick={() => navigator.clipboard.writeText(proofs.publicSignals.join(", "))}
                title="Copy ZK proof"
                className="p-1 hover:bg-gray-700 rounded"
              >
                <ClipboardCopyIcon className="h-5 w-5" />
              </button>
            </div>
            <ul>
              {proofs.publicSignals.map((proof, index) => (
                <li key={index} className="break-all">
                  {proof}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
