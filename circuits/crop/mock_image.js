const fs = require("fs");

// Function to generate a random number between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to create the matrix with random values
function createMatrix(rows, cols) {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push([getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)]);
    }
    matrix.push(row);
  }
  return matrix;
}

// Create the original 700x700 matrix
const originalMatrix = createMatrix(700, 700);

// Create the cropped 350x350 matrix
const croppedMatrix = originalMatrix.slice(0, 350).map((row) => row.slice(0, 350));

// Create an object with the "orig" field containing the original matrix
// and the "new" field containing the cropped matrix
const data = { orig: originalMatrix, new: croppedMatrix };

// Convert the data object to a JSON string
const jsonData = JSON.stringify(data);

// Write the JSON data to a file named "matrix.json"
fs.writeFileSync("matrix.json", jsonData);

console.log("Matrix saved to matrix.json");
