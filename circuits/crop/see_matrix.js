const fs = require("fs");

// Function to read the JSON file and parse the data
function readJsonFile(filename) {
  try {
    const data = fs.readFileSync(filename, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading the JSON file:", error);
    return null;
  }
}

// Function to get the size and width of a matrix
function getMatrixSize(matrix) {
  return {size: matrix.length, width: matrix[0].length};
}

// Function to get an element from a matrix at a specific row and column
function getElement(matrix, row, col) {
  return matrix[row][col];
}

// Read the JSON file and parse the data
const jsonFilename = "matrix.json";
const jsonData = readJsonFile(jsonFilename);

if (jsonData) {
  // Extract the original matrix and cropped matrix from the JSON data
  const originalMatrix = jsonData.orig;
  const croppedMatrix = jsonData.new;

  // Get the size and width of both matrices
  const originalSize = getMatrixSize(originalMatrix);
  const croppedSize = getMatrixSize(croppedMatrix);

  // Get an element from both matrices (e.g., element at row 0, column 0)
  const originalElement = getElement(originalMatrix, 0, 0);
  const croppedElement = getElement(croppedMatrix, 0, 0);

  // Display the information
  console.log("Original Matrix:");
  console.log("Size:", originalSize.size);
  console.log("Width:", originalSize.width);
  console.log("Element at (0, 0):", originalElement);

  console.log("\nCropped Matrix:");
  console.log("Size:", croppedSize.size);
  console.log("Width:", croppedSize.width);
  console.log("Element at (0, 0):", croppedElement);
}
