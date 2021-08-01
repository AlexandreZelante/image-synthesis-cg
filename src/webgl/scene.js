import { createBuffer, bindBuffer } from "./buffer.js";

let animationFrameId;

const matrixes = {
  model: mat4.create(),
  view: mat4.create(),
  normal: mat4.create(),
  projection: mat4.create(),
  rotation: {
    x: mat4.create(),
    y: mat4.create(),
  },
};

const config = {
  rotation: {
    speed: 0.01,
    axes: [0, 1, 0],
  },
};

const multiplyMatrixes = (mvp, mv, { model, view, projection }) => {
  mat4.multiply(mv, view, model);
  mat4.multiply(mvp, projection, mv);
};

const generateNormalMatrix = (normal, mv) => {
  mat4.invert(normal, mv);
  mat4.transpose(normal, normal);
};

const drawScene = (gl, program, model) => {
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const fieldOfView = (45 * Math.PI) / 180;
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;

  mat4.perspective(matrixes.projection, fieldOfView, aspect, zNear, zFar);
  mat4.translate(matrixes.model, matrixes.model, [-0.0, 0.0, -16.0]);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  drawModel(gl, program, model);
};

const getPowerOfTwo = (size) => {
  let power = 1;
  while (power < size) {
    power *= 2;
  }
  return power;
};

const drawText = (gl) => {
  const text = "IGOR ANTUN DA COSTA GAGO";
  const textSize = 24;

  var canvas = document.getElementById("text");
  var ctx = canvas.getContext("2d");

  ctx.font = `${textSize}px monospace`;
  canvas.width = gl.canvas.width; // getPowerOfTwo(ctx.measureText(text).width);
  canvas.height = gl.canvas.height; //getPowerOfTwo(2 * textSize);

  ctx.fillStyle = "purple"; // This determines the text colour, it can take a hex value or rgba value (e.g. rgba(255,0,0,0.5))
  ctx.textAlign = "center"; // This determines the alignment of text, e.g. left, center, right
  ctx.textBaseline = "middle"; // This determines the baseline of the text, e.g. top, middle, bottom
  ctx.font = `${textSize}px monospace`;

  ctx.fillText(text, gl.canvas.width / 2, gl.canvas.height / 2);
};

export const drawModel = (gl, program, model) => {
  const vertexes = model.vertexes;

  const positionBuffer = createBuffer(gl, vertexes);
  bindBuffer(gl, program, "aVertexPosition", positionBuffer);

  const mvMatrix = mat4.create();
  const mvpMatrix = mat4.create();

  const uniformMatrixes = {
    normal: gl.getUniformLocation(program, "normalMatrix"),
    matrix: gl.getUniformLocation(program, "matrix"),
  };

  const render = () => {
    animationFrameId = requestAnimationFrame(render);

    drawText(gl, program);

    mat4.rotate(
      matrixes.model,
      matrixes.model,
      config.rotation.speed,
      config.rotation.axes
    );

    multiplyMatrixes(mvpMatrix, mvMatrix, matrixes);
    generateNormalMatrix(matrixes.normal, mvMatrix);

    gl.uniformMatrix4fv(uniformMatrixes.matrix, false, mvpMatrix);
    gl.uniformMatrix4fv(uniformMatrixes.normal, false, matrixes.normal);

    gl.drawArrays(gl.TRIANGLES, 0, vertexes.length / 3);

    var text = document.getElementById("text");
    text.style.transform = `rotateY(${-matrixes.rotation.x}deg)`;
  };

  render();
};

export default drawScene;
