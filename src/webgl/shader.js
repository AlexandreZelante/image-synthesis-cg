// Carrega o shader a ser utilizado
const loadShader = (gl, type, source) => {
  // Cria o shader
  const shader = gl.createShader(type);

  // Carrega e compila o shader
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(`Não foi possível compilar o shader: ${gl.getShaderInfoLog(shader)}`);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
};

// Inicializa o programa do shader
export const initShaderProgram = (gl, vertexSrc, fragmentSrc) => {
  // Carrega os shaders de vertex e fragmento
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexSrc);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentSrc);

  // Cria o programa, vincula os shaders e o define como o ativo
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
