const vertex = `
  precision mediump float;

  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;

  uniform mat4 matrix;

  varying vec2 vTextureCoord;
  
  void main() {
    vTextureCoord = aTextureCoord;
    gl_Position = matrix * vec4(aVertexPosition, 1);
  }
`;

export default vertex;
