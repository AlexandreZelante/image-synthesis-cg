// Função responsável por carregar e renderizar a textura
const loadTexture = (gl, program) => {
  const textureLocation = gl.getAttribLocation(program, "aTextureCoord");

  // Atribui as coordenadas da textura
  const textureCoordsBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordsBuffer);

  const textureCoords = [0, 0, 1, 0, 1, 1, 0, 1];
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(textureCoords),
    gl.STATIC_DRAW
  );

  // Inicializa a textura
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.enableVertexAttribArray(textureLocation);
  gl.vertexAttribPointer(textureLocation, 2, gl.FLOAT, false, 0, 0);

  // Vincula a textura e renderiza o texto do documento
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    document.getElementById("text")
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
};

export default loadTexture;
