// Cria, popula e vincula os buffers
export const createBuffer = (gl, data) => {
  const buffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

  return buffer;
};

// Vincula os buffers
export const bindBuffer = (gl, program, name, buffer) => {
  const attribLocation = gl.getAttribLocation(program, name);

  gl.enableVertexAttribArray(attribLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.vertexAttribPointer(attribLocation, 3, gl.FLOAT, false, 0, 0);

  return attribLocation;
};

// Inicializa os buffers de posição
const initBuffers = (gl, model) => {
  const vertexes = model.vertexPositions;

  const positionBuffer = createBuffer(gl, vertexes);
  bindBuffer(positionBuffer);
};

export default initBuffers;
