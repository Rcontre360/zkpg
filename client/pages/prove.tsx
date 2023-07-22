import {useState} from "react";

export default function ProveModifications() {
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Cropping");
  const [proofs, setProofs] = useState([]);

  const handleProveModifications = async () => {
    setLoading(true);
    // Your async logic here
    // For demonstration purposes, I'm setting dummy proofs
    setProofs(["0x1234567890abcdef", "0xabcdef1234567890"]);
    // After completing the logic:
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex p-8">
      {/* Options on the left */}
      <div className="flex-none w-1/4 space-y-4 pr-8">
        <h1 className="text-2xl font-bold mb-4">Prove changes of an image</h1>
        <button
          onClick={() => setSelectedOption("Cropping")}
          className={`block w-full text-left p-4 rounded ${selectedOption === "Cropping" ? "bg-gray-700" : ""
            }`}
        >
          Cropping{" "}
          <span className="badge bg-blue-500 text-xs px-2 py-1 ml-2">Original & Cropped</span>
        </button>
        <button
          onClick={() => setSelectedOption("Grayscaling")}
          className={`block w-full text-left p-4 rounded ${selectedOption === "Grayscaling" ? "bg-gray-700" : ""
            }`}
        >
          Grayscaling{" "}
          <span className="badge bg-blue-500 text-xs px-2 py-1 ml-2">Normal & Grayscaled</span>
        </button>
        <button
          onClick={() => setSelectedOption("Resizing")}
          className={`block w-full text-left p-4 rounded ${selectedOption === "Resizing" ? "bg-gray-700" : ""
            }`}
        >
          Resizing
        </button>
      </div>

      {/* Image inputs in the center */}
      <div className="flex-1 space-y-4">
        <div className="border-dashed border-2 border-gray-600 p-4">
          <input type="file" accept="image/*" className="w-full bg-gray-800 p-2 rounded" />
          <p className="text-center mt-2">Original Image</p>
        </div>
        <div className="border-dashed border-2 border-gray-600 p-4">
          <input type="file" accept="image/*" className="w-full bg-gray-800 p-2 rounded" />
          <p className="text-center mt-2">Modified Image</p>
        </div>
        <button
          onClick={handleProveModifications}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Processing..." : "Prove"}
        </button>
      </div>

      {/* Metadata on the right */}
      <div className="flex-none w-1/4 space-y-4 pl-8">
        <h2 className="text-xl font-bold">Metadata</h2>
        <div className="border border-gray-600 p-4 rounded">
          <h3 className="font-semibold mb-2">Proof of Changes</h3>
          <ul>
            {proofs.map((proof, index) => (
              <li key={index} className="break-all">
                {proof}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
