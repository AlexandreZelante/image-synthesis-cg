import loadTexture from "./texture.js";

const drawText = (gl, program) => {
  // Inicializa o canvas do documento e textos
  const canvas = document.getElementById("text");
  const ctx = canvas.getContext("2d");

  canvas.width = gl.canvas.width;
  canvas.height = gl.canvas.height;

  // Objetos com textos a serem utilizados e coordenadas de posição
  const nameArea = {
    text: document.getElementById("name").value,
    x: canvas.width / 5,
    y: canvas.height / 3.25,
    width: canvas.width / 1.55,
  };

  const filiationArea1 = {
    text: document.getElementById("filiation1").value,
    x: canvas.width / 2.55,
    y: canvas.height / 2.5,
    width: canvas.width / 2.5,
  };

  const filiationArea2 = {
    text: document.getElementById("filiation2").value,
    x: canvas.width / 2.55,
    y: canvas.height / 2.25,
    width: canvas.width / 2.5,
  };

  const birthdayArea = {
    text: document.getElementById("birthday").value,
    x: canvas.width / 2.55,
    y: canvas.height / 1.64,
    width: canvas.width / 5.5,
  };

  const renderText = () => {
    // Para cada área, renderiza o texto correspondente
    const areasToFill = [
      nameArea,
      filiationArea1,
      filiationArea2,
      birthdayArea,
    ];
    areasToFill.forEach((area) => {
      ctx.font = "48px monospace";

      // Preenche o fundo branco
      ctx.fillStyle = "#C2D3A9";
      ctx.fillRect(area.x, area.y, area.width, parseInt(ctx.font, 10));

      // Preenche o texto
      ctx.fillStyle = "black";
      ctx.textBaseline = "top";
      ctx.font = "bold 48px monospace";
      ctx.fillText(area.text.toUpperCase(), area.x, area.y);
    });
  };

  // Inicializa a imagem de fundo
  const background = new Image();
  background.src = "rg.jpg";
  background.onload = () => {
    // Renderiza a imagem de fundo ao carregar o arquivo
    ctx.drawImage(background, 0, 0, gl.canvas.width, gl.canvas.height);
    renderText();
    loadTexture(gl, program, true);
  };

  // Atualiza periodicamente as informações do documento
  setTimeout(() => drawText(gl, program), 100);
};

export default drawText;
