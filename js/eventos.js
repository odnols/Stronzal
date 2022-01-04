// Captura o evento de clique para o botão de anterior
$("#jplayer_anterior").click(function() {
    playListAnterior();
    $(this).blur();
    return false;
});

// Captura o evento de clique para o botão de próximo
$("#jplayer_proximo").click(function() {
    playListProximo();
    $(this).blur();
    return false;
});

$("#jplayer_play").click(function() {
    tocando_agora(id_faixa_atual);
});

$("#jplayer_pause").click(function() {
    tocando_agora("auto");
});

$("#btn_pagina_inicial").click(function() {
    esconde_tudo();
    $("#pagina_inicial").show();
    document.getElementById("playlist").style.animation = "esconde_playlist 1s";

    playlist_exibe = 0;

    setTimeout(() => {
        document.getElementById("playlist").style.right = "-50%";
    }, 800);

    sinc_botao_playlist(0);
});

$("#btn_biblioteca").click(function() {
    esconde_tudo();
    $("#biblioteca_user").show();
});

$("#btn_faixas").click(function() {
    esconde_tudo();
    $("#faixas_curtidas").show();
});

$("#btn_playlists").click(function() {
    esconde_tudo();
    $("#playlists_criadas").show();

    sincroniza_playlists();
});

$("#jplayer_random").click(function() {
    aleatorio = aleatorio == 0 ? 1 : 0;
    let prev_random = document.getElementsByClassName("status_random");

    if(aleatorio)
        prev_random[0].style.color = "lightseagreen";
    else
        prev_random[0].style.color = "rgb(105, 105, 105)";

    localStorage.setItem('random_stronzal', aleatorio);
});

$("#jplayer_repeat").click(function() {
    repeteco = repeteco == 0 ? 1 : 0;
    let prev_repeat = document.getElementsByClassName("status_repeteco");

    if(repeteco)
        prev_repeat[0].style.color = "lightseagreen";
    else
        prev_repeat[0].style.color = "rgb(105, 105, 105)";

    localStorage.setItem('repeteco_stronzal', repeteco);
});

$("#recolher_playlist").click(function() {
    playlist_exibe = 0;

    $("#recolher_playlist").hide();
    $("#mostrar_playlist").show();

    document.getElementById("playlist").style.animation = "esconde_playlist 1s";

    playlist_exibe = 0;

    setTimeout(() => {
        document.getElementById("playlist").style.right = "-50%";
    }, 800);

    sinc_botao_playlist(playlist_exibe);
});

$("#mostrar_playlist").click(function() {
    
    $("#recolher_playlist").show();
    $("#mostrar_playlist").hide();
    
    document.getElementById("playlist").style.animation = "mostra_playlist 1s";

    setTimeout(() => {
        document.getElementById("playlist").style.right = "19px";
    }, 900);

    playlist_exibe = 1;

    sinc_botao_playlist(playlist_exibe);
});

function sinc_botao_playlist(caso){
    if(caso){
        $("#recolher_playlist").show();
        $("#mostrar_playlist").hide();
    }else{
        $("#recolher_playlist").hide();
        $("#mostrar_playlist").show();
    }

    if(!playlist_exibe){
        document.getElementById("lista_biblioteca_pessoal").style.width = "70%";
    }else
        document.getElementById("lista_biblioteca_pessoal").style.width = "55%";
}

function esconde_tudo(){
    $("#pagina_inicial").hide();
    $("#biblioteca_user").hide();
    $("#faixas_curtidas").hide();
    $("#playlists_criadas").hide();
    $("#faixas_playlist").hide();
}

function sync_now_playing(id_faixa){

    
}