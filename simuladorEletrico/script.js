
// trazendo os elementos do HTML
const tensao = document.getElementById("tensao");
const resistencia = document.getElementById("resistencia");

// controles
const controleTensao = document.getElementById("tensao");
const controleResistencia = document.getElementById("resistencia");

// elementos que exibem os valores
const textoTensao = document.getElementById("valorTensao");
const textoResistencia = document.getElementById("valorResistencia");
const textoCorrente = document.getElementById("valorCorrente");
const textoPotencia = document.getElementById("valorPotencia");

// elementos da lâmpada
const lampGlow = document.getElementById("lampGlow");
const lampBulbo = document.getElementById("lampBulbo");

function atualizarValores() {

    // pega os valores dos controles
    const valorTensao = Number(controleTensao.value);
    const valorResistencia = Number(controleResistencia.value);

    // calcula a corrente e a potência
    const corrente = valorTensao / valorResistencia;
    const potencia = valorTensao * corrente;

    // atualiza os valores na tela
    textoTensao.textContent = valorTensao + " V";
    textoResistencia.textContent = valorResistencia + " Ω";
    textoCorrente.textContent = corrente.toLocaleString("pt-BR") + " A";
    textoPotencia.textContent = potencia.toLocaleString("pt-BR") + " W";

    // calcula o brilho da lâmpada
    const brilho = Math.min(potencia / 60, 1);

    // atualiza a aparência da lâmpada
    lampGlow.style.opacity = brilho * 0.8; 

    const intensidade = Math.round(51 + (250 - 51) * brilho);
    const verde = Math.round(65 + (204 - 65) * brilho);
    const azul = Math.round(85 + (21 - 85) * brilho);

    lampBulbo.style.fill = `rgb(${intensidade}, ${verde}, ${azul})`;

    lampBulbo.style.opacity = 1;
}

// detecta alterações nos controles
controleTensao.addEventListener("input", atualizarValores);
controleResistencia.addEventListener("input", atualizarValores);

// atualiza o simulador ao carregar a página
atualizarValores();
