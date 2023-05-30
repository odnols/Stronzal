var faixas_curtidas = [];
var volume_musica = 2;
var aleatorio = 0;
var repeteco = 0;
var cor_escolhida = 1;
var tempo_total_reverso = 0;
var id_faixa_atual = 0;
var indice_faixa_atual = 0;

var minhaPlayList = [
    { id: 539, mp3: "songs/238425/1.mp3", album: "238425", name: "Skyfall" }
];

carrega_cor();

function cores_disponiveis() {

    let cores = {
        1: ["#20b2aa", "#0e4e4bb3", "#02221adc"],
        2: ["#b22020", "#4e0e0eb3", "#220202dc"],
        3: ["#b2209f", "#4e0e43b3", "#22021edc"],
        4: ["#4020b2", "#240e4eb3", "#090222dc"],
        5: ["#b2b020", "#4e480eb3", "#222102dc"],
        6: ["#2cb220", "#154e0eb3", "#072202dc"]
        // 7 : ["#b27320", "#4e2d0eb3", "#221302dc"]
    }

    return cores;
}

let faixas_c_historico = localStorage.getItem('faixas_curtidas');
if (faixas_c_historico !== null) {
    faixas_c_historico = faixas_c_historico.split(",");

    for (let i = 0; i < faixas_c_historico.length; i++) {
        faixas_curtidas.push(faixas_c_historico[i]);
    }

    if (faixas_curtidas[0] === '' && faixas_curtidas.length === 1)
        faixas_curtidas = [];
}

const playlist_ativa_h = localStorage.getItem("playlist_ativa");
if (typeof playlist_ativa_h !== "undefined")
    minhaPlayList = JSON.parse(playlist_ativa_h);

let musica_ativa_h = localStorage.getItem("musica_ativa_h");
if (typeof musica_ativa_h != "undefined") {
    id_faixa_atual = parseInt(musica_ativa_h);

    const indice_faixa_atual_h = localStorage.getItem("indice_faixa_ativa_h");
    indice_faixa_atual = parseInt(indice_faixa_atual_h);
}

let porcentagemTocada_h = localStorage.getItem("timeline_progress");
if (typeof porcentagemTocada_h !== "undefined")
    porcentagemTocada = parseFloat(porcentagemTocada_h);

let volume_historico = localStorage.getItem('volume_musica');
if (typeof volume_musica !== "undefined")
    volume_musica = parseInt(volume_historico);

let random = localStorage.getItem('random_stronzal');
if (typeof random !== "undefined") {
    aleatorio = parseInt(random);
    let prev_random = document.getElementsByClassName("status_random");

    const cores = cores_disponiveis();

    if (aleatorio)
        prev_random[0].style.color = `${cores[cor_escolhida][0]}`;
    else
        prev_random[0].style.color = "rgb(105, 105, 105)";
}

let repeat = localStorage.getItem('repeteco_stronzal');
if (typeof repeat !== "undefined") {
    repeteco = parseInt(repeat);
    let prev_repeat = document.getElementsByClassName("status_repeteco");

    const cores = cores_disponiveis();

    if (repeteco)
        prev_repeat[0].style.color = `${cores[cor_escolhida][0]}`;
    else
        prev_repeat[0].style.color = "rgb(105, 105, 105)";
}

let tempo_total_reverso_h = localStorage.getItem('tempo_total_reverso');
if (typeof tempo_total_reverso_h !== "undefined")
    tempo_total_reverso = parseInt(tempo_total_reverso_h);


function carrega_cor() {
    let cor_escolhida_c = localStorage.getItem("cor_destaque_stronzal");
    if (typeof cor_escolhida_c !== "undefined")
        cor_escolhida = parseInt(cor_escolhida_c);

    if (isNaN(cor_escolhida))
        cor_escolhida = 1;

    return cor_escolhida;
}

// Horário
const horario = new Date();
document.getElementById("time_set").innerHTML = horario.getHours() >= 12 && horario.getHours() < 18 ? "Boa tarde" : horario.getHours() >= 18 || horario.getHours() < 6 ? "Boa noite" : "Bom dia";