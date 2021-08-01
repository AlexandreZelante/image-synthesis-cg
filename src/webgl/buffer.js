export const createBuffer = (gl, data) => {
  const buffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

  return buffer;
};

export const bindBuffer = (gl, program, name, buffer) => {
  const attributeLocation = gl.getAttribLocation(program, name);

  gl.enableVertexAttribArray(attributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.vertexAttribPointer(attributeLocation, 3, gl.FLOAT, false, 0, 0);

  return attributeLocation;
};

const initBuffers = (gl, model) => {
  const vertexes = model.vertexPositions;

  const positionBuffer = createBuffer(gl, vertexes);
  bindBuffer(positionBuffer);
};

export default initBuffers;
