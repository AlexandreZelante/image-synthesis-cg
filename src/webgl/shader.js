const loadShader = (gl, type, source) => {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(`Não foi possível compilar o shader: ${gl.getShaderInfoLog(shader)}`);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
};

export const initShaderProgram = (gl, vertexSrc, fragmentSrc) => {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexSrc);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentSrc);

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    alert(
      `Não foi possível inicializar o shader: ${gl.getProgramInfoLog(program)}`
    );
    return null;
  }

  return program;
};
