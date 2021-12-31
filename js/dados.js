var faixas_curtidas = [];
var volume_musica = 2;
var aleatorio = 0;
var repeteco = 0;

let faixas_c_historico = localStorage.getItem('faixas_curtidas');
if(typeof faixas_c_historico !== "undefined"){
    faixas_c_historico = faixas_c_historico.split(",");

    for(let i = 0; i < faixas_c_historico.length; i++){
        faixas_curtidas.push(parseInt(faixas_c_historico[i]))
    }
}

let volume_historico = localStorage.getItem('volume_musica');
if(typeof volume_musica !== "undefined")
    volume_musica = parseInt(volume_historico);

let random = localStorage.getItem('random_stronzal');
if(typeof random !== "undefined"){
    aleatorio = parseInt(random);
    let prev_random = document.getElementsByClassName("status_random");

    if(aleatorio)
        prev_random[0].style.color = "lightseagreen";
    else
        prev_random[0].style.color = "rgb(105, 105, 105)";
}

let repeat = localStorage.getItem('repeteco_stronzal');
if(typeof repeat !== "undefined"){
    repeteco = parseInt(repeat);
    let prev_repeat = document.getElementsByClassName("status_repeteco");
    
    if(repeteco)
        prev_repeat[0].style.color = "lightseagreen";
    else
        prev_repeat[0].style.color = "rgb(105, 105, 105)";
}