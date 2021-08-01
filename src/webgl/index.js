import vertexShader from "../shaders/vertex.js";
import fragmentShader from "../shaders/fragment.js";
import rgModel from "../models/rg.json" assert { type: "json" };

import drawScene from "./scene.js";
import { initShaderProgram } from "./shader.js";

export const initCanvas = async () => {
  // Inicializa o canvas e dimensiona o tamanho da tela
  const canvas = document.getElementById("canvas");
  const gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  window.gl = gl;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (!gl) {
    alert("Não foi possível iniciar o WebGL.");
  }

  // Inicializa os shaders
  const program = initShaderProgram(gl, vertexShader, fragmentShader);

  // Renderiza a cena principal
  drawScene(gl, program, rgModel);
};
