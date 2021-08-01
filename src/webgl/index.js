import vertexShader from "../shaders/vertex.js";
import fragmentShader from "../shaders/fragment.js";
import rgModel from "../models/rg.json" assert { type: "json" };

import drawScene from "./scene.js";
import { initShaderProgram } from "./shader.js";

export const initCanvas = async () => {
  const canvas = document.getElementById("canvas");
  const gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (!gl) {
    alert("Não foi possível iniciar o WebGL.");
  }

  const program = initShaderProgram(gl, vertexShader, fragmentShader);

  drawScene(gl, program, rgModel);
};
