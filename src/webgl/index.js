import vertexShader from "../shaders/vertex.js";
import fragmentShader from "../shaders/fragment.js";

import drawScene from "./scene.js";
import loadTexture from "./texture.js";
import initBuffers from "./buffer.js";
import { initShaderProgram } from "./shader.js";

export const initCanvas = () => {
  const canvas = document.getElementById("canvas");
  const gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (!gl) {
    alert("Não foi possível iniciar o WebGL.");
  }

  const shaderProgram = initShaderProgram(gl, vertexShader, fragmentShader);

  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      textureCoord: gl.getAttribLocation(shaderProgram, "aTextureCoord"),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(
        shaderProgram,
        "uProjectionMatrix"
      ),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
      uSampler: gl.getUniformLocation(shaderProgram, "uSampler"),
    },
  };

  const buffers = initBuffers(gl);

  const texture = loadTexture(gl, "cubetexture.png");

  let then = 0;
  const render = (now) => {
    const deltaTime = now / 1000 - then;
    then = now / 1000;

    drawScene(gl, programInfo, buffers, texture, deltaTime);

    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
};
