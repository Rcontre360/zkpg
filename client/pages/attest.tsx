import {createAttestation} from "@shared/utils/eas";
import {convertImageToMatrix, hashMatrix} from "@shared/utils/images";
import {getAccount, getEthersProvider, sign_message} from "@shared/utils/metamask";
import {useState} from "react";
import {AiOutlineCopy} from "react-icons/ai";

export default function MakeImageAttestation() {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [metadata, setMetadata] = useState<any>();

  const handleImageSelection = (event: any) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleVerifyImage = async () => {
    console.log("handle verify", selectedImage);
    if (!selectedImage) return;

    setLoading(true);

    const matrix = await convertImageToMatrix(selectedImage);
    console.log("matrix", matrix.length, matrix[0].length, matrix[0][0]);
    const imageHash = hashMatrix(matrix);
    console.log("image hash", imageHash);
    const imageSign = await sign_message(imageHash);
    console.log("image sign", imageSign);
    const account = await getAccount();
    console.log("account", account);
    const provider = await getEthersProvider();

    try {
      await createAttestation(provider.getSigner(), {
        imageHash,
        signature: imageSign,
        account,
      });
      setVerificationResult(true);
      console.log("set metadata");
      setMetadata({
        history: `Image taken at ${new Date().toLocaleString("en-US")}`,
        photographer: account,
        hash: imageHash,
        signature: imageSign,
      });
    } catch (err) {
      console.log("attestation error", err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-32">
      <h1 className="text-3xl font-bold mb-8">Make Attestation</h1>
      <div className="border-dashed border-2 border-gray-600 p-4 w-1/2">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="imageInput"
          onChange={handleImageSelection}
        />
        <label
          htmlFor="imageInput"
          className="w-full bg-gray-800 p-2 rounded cursor-pointer text-center"
        >
          {selectedImage ? selectedImage.name : "Click to select an image"}
        </label>
      </div>
      <button
        onClick={handleVerifyImage}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded w-1/2 mt-4"
      >
        Make Attestation
      </button>

      {verificationResult
        ? metadata && (
          <VerificationComponent verificationResult={verificationResult} metadata={metadata} />
        )
        : verificationResult !== null && (
          <p className="text-red-500 font-bold mt-10">Image not verified</p>
        )}
    </div>
  );
}

// Utility function to truncate a string and add an ellipsis
function truncateString(str, maxLength) {
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
}

// Utility function to copy text to clipboard
function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

const VerificationComponent = ({verificationResult, metadata}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = (text) => {
    copyToClipboard(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset copied status after 2 seconds
  };

  return (
    <>
      {verificationResult !== null && (
        <div className="mt-8 w-1/2 p-4 rounded border border-gray-600">
          {verificationResult ? (
            <>
              <p className="text-green-500 font-bold">Image is verified</p>
              <div className="mt-4">
                <h2 className="font-semibold">Metadata:</h2>
                <p>History: {metadata.history}</p>
                <p>
                  Account:{" "}
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleCopyClick(metadata.photographer)}
                  >
                    {truncateString(metadata.photographer, 10)}...
                    {isCopied && <span className="text-green-500">Copied!</span>}
                    <AiOutlineCopy className="inline-block ml-2" />
                  </span>
                </p>
                <p>
                  Image Hash:{" "}
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleCopyClick(metadata.hash)}
                  >
                    {truncateString(metadata.hash, 10)}...
                    {isCopied && <span className="text-green-500">Copied!</span>}
                    <AiOutlineCopy className="inline-block ml-2" />
                  </span>
                </p>
                <p>
                  Signature:{" "}
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleCopyClick(metadata.signature)}
                  >
                    {truncateString(metadata.signature, 10)}...
                    {isCopied && <span className="text-green-500">Copied!</span>}
                    <AiOutlineCopy className="inline-block ml-2" />
                  </span>
                </p>
              </div>
            </>
          ) : (
            <p className="text-red-500 font-bold">Image not verified</p>
          )}
        </div>
      )}
    </>
  );
};
