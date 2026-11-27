
// trazendo os elementos do HTML
const tensao = document.getElementById("tensao");
const resistencia = document.getElementById("resistencia");

// exibindo os valores no console
console.log(tensao.value);
console.log(resistencia.value);

//convertendo os valores para numeros
const valorTensao = Number(tensao.value);
const valorResistencia = Number(resistencia.value);

//calculando a corrente

const corrente = valorTensao / valorResistencia;

console.log("Corrente elétrica: " + corrente + " A");

//fazendo javascript entender que tem que atualizar o valor da corrente quando o usuário mudar os valores de tensão ou resistência

//controles
const controleTensao = document.getElementById("tensao");
const controleResistencia = document.getElementById("resistencia");

const textoTensao = document.getElementById("valorTensao");
const textoResistencia = document.getElementById("valorResistencia");
const  textoCorrente = document.getElementById("valorCorrente");
const textoPotencia = document.getElementById("valorPotencia");

function atualizarValores() {

    //pega os valores dos controles
    const tensao = Number(controleTensao.value);
    const resistencia = Number(controleResistencia.value);

    //calcula a corrente e a potência
    const corrente = tensao / resistencia;
    const potencia = tensao * corrente;

    //atualiza os valores na tela
    textoTensao.textContent = tensao + " V";
    textoResistencia.textContent = resistencia + " Ω";
    textoCorrente.textContent = corrente.toLocaleString("pt-BR") + " A";
    textoPotencia.textContent = potencia.toLocaleString("pt-BR") + " W";
}

//detecta que os controles estão sendo alterados
controleTensao.addEventListener("input", atualizarValores);
controleResistencia.addEventListener("input", atualizarValores);

//atualizar o simulador
atualizarValores();