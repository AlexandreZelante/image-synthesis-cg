import { createBuffer, bindBuffer } from "./buffer.js";
import { multiplyMatrixes, generateNormalMatrix } from "./matrix-operations.js";
import drawText from "./document-canvas.js";

let animationFrameId;

// Inicializa as matrizes de modelo, normal, viewport e projeção
const matrixes = {
  model: mat4.create(),
  view: mat4.create(),
  normal: mat4.create(),
  projection: mat4.create(),
};

// Função responsável por inicializar e resetar a projeção
const resetProjection = (gl) => {
  // Configurações de distância, ângulo de visão e perspectiva
  const zNear = 0.1;
  const zFar = 100;
  const fieldOfView = (45 * Math.PI) / 180;
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;

  // Aplica a matriz de projeção
  mat4.perspective(matrixes.projection, fieldOfView, aspect, zNear, zFar);
  mat4.translate(matrixes.model, matrixes.model, [-0, 0, -16]);
};

// Função responsável por resetar a visualização
window.resetMatrixes = () => {
  mat4.identity(matrixes.model);
  mat4.identity(matrixes.view);
  mat4.identity(matrixes.normal);
  mat4.identity(matrixes.projection);
  resetProjection(window.gl);
};

// Função responsável por renderizar a cena principal
const drawScene = (gl, program, model) => {
  // Inicializa a projeção
  resetProjection(gl);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Renderiza o modelo do RG
  drawModel(gl, program, model);
};

// Função responsável por renderizar o modelo do RG
export const drawModel = (gl, program, model) => {
  // Cria e vincula o buffer de posições
  const positionBuffer = createBuffer(gl, model.vertexes);
  bindBuffer(gl, program, "aVertexPosition", positionBuffer);

  // Cria as matrizes de visualização do modelo
  const mvMatrix = mat4.create();
  const mvpMatrix = mat4.create();

  const uniformMatrixes = {
    normal: gl.getUniformLocation(program, "normalMatrix"),
    matrix: gl.getUniformLocation(program, "matrix"),
  };

  // Renderiza o texto do documento
  drawText(gl, program);

  // Loop principal de renderização do modelo
  const render = () => {
    animationFrameId = requestAnimationFrame(render);

    // Aplica as multiplicações responsáveis por rotacionar o modelo
    mat4.rotate(
      matrixes.model,
      matrixes.model,
      document.getElementById("rotationSpeed").value,
      [
        document.getElementById("rotationXAxis").checked ? 1 : 0,
        document.getElementById("rotationYAxis").checked ? 1 : 0,
        document.getElementById("rotationZAxis").checked ? 1 : 0,
        0,
      ]
    );

    // Multiplica as matrizes de visualização e gera suas normais
    multiplyMatrixes(mvpMatrix, mvMatrix, matrixes);
    generateNormalMatrix(matrixes.normal, mvMatrix);

    gl.uniformMatrix4fv(uniformMatrixes.matrix, false, mvpMatrix);
    gl.uniformMatrix4fv(uniformMatrixes.normal, false, matrixes.normal);

    // Vincula a textura a ser utilizada
    const textureLocation = gl.getUniformLocation(program, "vTextureCoord");
    gl.uniform1i(textureLocation, 0);

    const cubeVertexIndexBuffer = gl.createBuffer();
    cubeVertexIndexBuffer.itemSize = 1;
    cubeVertexIndexBuffer.numItems = 36;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);

    const cubeVertexIndices = [0, 1, 2, 0, 2, 3];
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(cubeVertexIndices),
      gl.STATIC_DRAW
    );

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    gl.drawElements(
      gl.TRIANGLES,
      model.vertexes.length / 3,
      gl.UNSIGNED_SHORT,
      0
    );
  };

  render();
};

export default drawScene;
