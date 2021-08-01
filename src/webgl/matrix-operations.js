// Multiplica as matrizes
export const multiplyMatrixes = (mvp, mv, { model, view, projection }) => {
  mat4.multiply(mv, view, model);
  mat4.multiply(mvp, projection, mv);
};

// Gera a matriz normal
export const generateNormalMatrix = (normal, mv) => {
  mat4.invert(normal, mv);
  mat4.transpose(normal, normal);
};
