
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