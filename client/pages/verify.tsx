import {useAppSelector} from "@redux/store";
import {convertImageToMatrix, hashMatrix} from "@shared/utils/images";
import {useState} from "react";
import {ImageMatrix} from "@shared/utils/images";
import Slider from "react-slick";

export default function VerifyImage() {
  const attestations = useAppSelector((state) => state.main.attestations);
  const [loading, setLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [metadata, setMetadata] = useState({});
  const [matrix, setImageMatrix] = useState<ImageMatrix>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null); // <-- New state for image validation result

  const handleVerifyImage = async () => {
    const imageHash = hashMatrix(matrix);

    const valid = attestations.some((att) => {
      const field = att.data.find((data) => data.name === "imageHash");
      return field.value.value === imageHash;
    });

    setIsValid(valid); // <-- Set the validation result
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    let matrix = await convertImageToMatrix(event.target.files[0]);
    setImageMatrix(matrix);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true, // This enables centered view with partial previous/next slides. Use with odd number of slidesToShow.
    centerPadding: "60px", // This
  };

  const formatCamelCase = (str) => {
    return str.replace(/([A-Z])/g, " $1").trim();
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start p-8 pt-16">
      <h1 className="text-3xl font-bold mb-8">Verify Image</h1>

      <Slider {...settings} className="w-full mb-12">
        {attestations.map((attestation, index) => (
          <div key={index} className="p-6 rounded border-2 border-lightblue bg-dark-blue m-3 h-60">
            <h2 className="text-xl font-bold mb-4">
              {attestation.type === "publish" ? "Publish Attestation" : "Modify Attestation"}
            </h2>
            {attestation.data.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center mb-3">
                <span className="font-semibold">{formatCamelCase(item.name)}:</span>
                <div className="flex items-center">
                  {item.name === "proof" ? (
                    <span className="truncate w-32 inline-block">
                      {item.value.value.map(({hex}) => hex).join(",")}
                    </span>
                  ) : (
                    <span className="truncate w-32 inline-block">{item.value.value}</span>
                  )}
                  <button onClick={() => navigator.clipboard.writeText(item.value.value)}>
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </Slider>

      <div
        className={`border-dashed border-2 ${isValid === true
            ? "border-green-500"
            : isValid === false
              ? "border-red-500"
              : "border-gray-600"
          } p-4 w-1/2 mb-4`}
      >
        <input
          type="file"
          accept="image/*"
          className="w-full bg-gray-800 p-2 rounded"
          onChange={handleImageChange}
        />
        <p className="text-center mt-2">Upload Image</p>
      </div>
      <button
        onClick={handleVerifyImage}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded w-1/2 mt-4"
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify"}
      </button>

      {isValid !== null && (
        <p className={`mt-4 ${isValid ? "text-green-500" : "text-red-500"}`}>
          {isValid ? "The image is valid" : "The image is invalid"}
        </p>
      )}

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
