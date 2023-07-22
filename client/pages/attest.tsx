import {useState} from "react";

export default function MakeImageAttestation() {
  const [loading, setLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [metadata, setMetadata] = useState({});

  const handleVerifyImage = async () => {
    setLoading(true);
    // Your async logic here

    // For demonstration purposes, I'm setting a dummy result and metadata
    // You can replace this with your actual logic
    const isVerified = Math.random() > 0.5; // Randomly set verification result for demo
    setVerificationResult(isVerified);

    if (isVerified) {
      setMetadata({
        history: "Image taken at XYZ location",
        photographer: "John Doe",
      });
    } else {
      setMetadata({});
    }

    // After completing the logic:
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-32">
      <h1 className="text-3xl font-bold mb-8">Make Attestation</h1>
      <div className="border-dashed border-2 border-gray-600 p-4 w-1/2">
        <input type="file" accept="image/*" className="w-full bg-gray-800 p-2 rounded" />
        <p className="text-center mt-2">Upload Image</p>
      </div>
      <button
        onClick={handleVerifyImage}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded w-1/2 mt-4"
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify"}
      </button>

      {verificationResult !== null && (
        <div className="mt-8 w-1/2 p-4 rounded border border-gray-600">
          {verificationResult ? (
            <>
              <p className="text-green-500 font-bold">Image is verified</p>
              <div className="mt-4">
                <h2 className="font-semibold">Metadata:</h2>
                <p>History: a</p>
                <p>Photographer: b</p>
              </div>
            </>
          ) : (
            <p className="text-red-500 font-bold">Image not verified</p>
          )}
        </div>
      )}
    </div>
  );
}
