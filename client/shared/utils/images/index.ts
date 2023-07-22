import {ethers} from "ethers";
import {keccak256} from "ethers/lib/utils";
import pica from "pica";

export type ImageMatrix = [number, number, number][][];

export const convertImageToMatrix = async (imageFile: any) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  const picaResizer = pica();

  img.src = URL.createObjectURL(imageFile);

  await new Promise((resolve) => (img.onload = resolve));

  canvas.width = 700;
  canvas.height = 700;

  await picaResizer.resize(img, canvas);

  const matrix: ImageMatrix = [];

  for (let y = 0; y < canvas.height; y++) {
    const row = [];
    for (let x = 0; x < canvas.width; x++) {
      const pixelData = ctx.getImageData(x, y, 1, 1).data;
      row.push([pixelData[0], pixelData[1], pixelData[2]]);
    }
    matrix.push(row);
  }

  return matrix;
};

export const hashMatrix = (matrix: ImageMatrix) => {
  const matrixString = matrix.flat(2).join("");
  console.log(matrixString);
  return keccak256(ethers.utils.toUtf8Bytes(matrixString));
};
