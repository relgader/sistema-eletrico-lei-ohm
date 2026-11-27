
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
const lampFilamento = document.getElementById("lampFilamento");

// elementos dos polos
const poloSuperior = document.getElementById("poloSuperior");
const poloInferior = document.getElementById("poloInferior");

const botaoPolaridade = document.getElementById("inverterPolaridade");
const textoSentido = document.getElementById("sentidoCorrente");

// indica se a polaridade está invertida
let polaridadeInvertida = false;

const setaSuperior = document.getElementById("setaSuperior");
const setaDireita = document.getElementById("setaDireita");
const setaInferior = document.getElementById("setaInferior");

// caminho percorrido pelas partículas
const caminhoCorrente = document.getElementById("caminhoCorrente");

// partículas
const particulas = [
    document.getElementById("particula1"),
    document.getElementById("particula2"),
    document.getElementById("particula3"),
    document.getElementById("particula4"),
    document.getElementById("particula5")
];

// intensidade atual da corrente
let intensidadeCorrente = 0;

// posição inicial de cada partícula
let progressoParticulas = [0, 0.2, 0.4, 0.6, 0.8];

// comprimento total do caminho
const comprimentoCaminho = caminhoCorrente.getTotalLength();

let ultimoTempo = 0;

function atualizarValores() {

    // pega os valores dos controles
    const valorTensao = Number(controleTensao.value);
    const valorResistencia = Number(controleResistencia.value);

    // calcula a corrente e a potência
    const corrente = valorTensao / valorResistencia;
    intensidadeCorrente = Math.abs(corrente);
    const potencia = valorTensao * corrente;

    // atualiza os valores na tela
    textoTensao.textContent = valorTensao + " V";
    textoResistencia.textContent = valorResistencia + " Ω";
    textoCorrente.textContent = corrente.toLocaleString("pt-BR") + " A";
    textoPotencia.textContent = potencia.toLocaleString("pt-BR") + " W";

    // atualiza os valores dos polos
    if (polaridadeInvertida) {
        poloSuperior.textContent = "0 V";
        poloInferior.textContent = "-" + valorTensao + " V";
    } else {
        poloSuperior.textContent = "+" + valorTensao + " V";
        poloInferior.textContent = "0 V";
    }

    // calcula o brilho da lâmpada
    const brilho = Math.min(potencia / 80, 1);

    // atualiza a aparência da lâmpada
    lampGlow.style.opacity = brilho;
    lampGlow.setAttribute("r", 30 + (brilho * 25));

    const intensidade = Math.round(51 + (250 - 51) * brilho);
    const verde = Math.round(65 + (204 - 65) * brilho);
    const azul = Math.round(85 + (21 - 85) * brilho);

    lampBulbo.style.fill = `rgb(${intensidade}, ${verde}, ${azul})`;

    lampBulbo.style.opacity = 1;
    lampFilamento.style.opacity = brilho;
}

// detecta alterações nos controles
controleTensao.addEventListener("input", atualizarValores);
controleResistencia.addEventListener("input", atualizarValores);

botaoPolaridade.addEventListener("click", function() {

    polaridadeInvertida = !polaridadeInvertida;

    const valorTensao = Number(controleTensao.value);

    if (polaridadeInvertida) {

        textoSentido.textContent = "Anti-horário";

        poloSuperior.textContent = "0 V";
        poloInferior.textContent = "-" + valorTensao + " V";

        poloSuperior.setAttribute("fill", "#38bdf8");
        poloInferior.setAttribute("fill", "#22c55e");

    } else {

        textoSentido.textContent = "Horário";

        poloSuperior.textContent = "+" + valorTensao + " V";
        poloInferior.textContent = "0 V";

        poloSuperior.setAttribute("fill", "#22c55e");
        poloInferior.setAttribute("fill", "#38bdf8");
    }

    atualizarSetas();
});

// atualiza o simulador ao carregar a página
atualizarValores();

function atualizarSetas() {

    if (polaridadeInvertida) {

        // sentido anti-horário
        setaSuperior.setAttribute("d", "M170 58 L155 50 L170 42");

        setaDireita.setAttribute("d", "M408 115 L400 100 L392 115");

        setaInferior.setAttribute("d", "M230 208 L245 200 L230 192");

    } else {

        // sentido horário
        setaSuperior.setAttribute("d", "M170 42 L185 50 L170 58");

        setaDireita.setAttribute("d", "M392 115 L400 130 L408 115");

        setaInferior.setAttribute("d", "M230 192 L215 200 L230 208");
    }
}

function animarParticulas(tempo) {

    // calcula a velocidade com base na corrente
    const velocidade = Math.min(intensidadeCorrente * 0.12, 0.8);

    // tempo entre os quadros
    if (ultimoTempo !== 0) {

        const intervalo = (tempo - ultimoTempo) / 1000;

        // atualiza a posição das partículas
        for (let i = 0; i < particulas.length; i++) {

            progressoParticulas[i] += velocidade * intervalo;

            // reinicia quando completa o circuito
            if (progressoParticulas[i] >= 1) {
                progressoParticulas[i] -= 1;
            }
        }
    }

    ultimoTempo = tempo;

    // posiciona cada partícula no circuito
    for (let i = 0; i < particulas.length; i++) {

        let posicao = progressoParticulas[i];

        // inverte o movimento conforme a polaridade
        if (polaridadeInvertida) {
            posicao = 1 - posicao;
        }

        const ponto = caminhoCorrente.getPointAtLength(
            posicao * comprimentoCaminho
        );

        particulas[i].setAttribute("cx", ponto.x);
        particulas[i].setAttribute("cy", ponto.y);
    }

    requestAnimationFrame(animarParticulas);
}

// inicia a animação das partículas
requestAnimationFrame(animarParticulas);
