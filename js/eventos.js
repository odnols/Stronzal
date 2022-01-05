var menu_configuracoes = 0;

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

$("#btn_abrir_configuracoes").click(function() {
    
    const config = document.getElementById("configuracoes");
    
    if(menu_configuracoes === 0){
        $("#configuracoes").show();
        menu_configuracoes = 1;

        config.style.animation = "abre_configuracoes .5s";
        config.style.padding = "15px";
        
        setTimeout(() => {
            config.style.height = "100%";

            config.style.animation = "none";
        }, 450);

        document.getElementById("playlist").style.overflowY = "hidden";
    }else{
        config.style.animation = "abre_configuracoes .5s reverse";
        menu_configuracoes = 0;
        
        setTimeout(() => {
            config.style.padding = "0px";
            config.style.height = "0%";
            document.getElementById("playlist").style.overflowY = "auto";

            config.style.animation = "none";
        }, 450);
    }
});

$("#jplayer_random").click(function() {
    aleatorio = aleatorio == 0 ? 1 : 0;
    let prev_random = document.getElementsByClassName("status_random");
    
    const cores = cores_disponiveis();

    if(aleatorio)
        prev_random[0].style.color = `${cores[cor_escolhida][0]}`;
    else
        prev_random[0].style.color = "rgb(105, 105, 105)";

    localStorage.setItem('random_stronzal', aleatorio);
});

$("#jplayer_repeat").click(function() {
    repeteco = repeteco == 0 ? 1 : 0;
    let prev_repeat = document.getElementsByClassName("status_repeteco");

    const cores = cores_disponiveis();
    
    if(repeteco)
        prev_repeat[0].style.color = `${cores[cor_escolhida][0]}`;
    else
        prev_repeat[0].style.color = "rgb(105, 105, 105)";

    localStorage.setItem('repeteco_stronzal', repeteco);
});

$("#btn_mostrar_playlist").click(function() {
    
    if(playlist_exibe === 0){
        
        document.getElementById("playlist").style.animation = "mostra_playlist .5s";

        setTimeout(() => {
            document.getElementById("playlist").style.right = "19px";
        }, 400);

        playlist_exibe = 1;

        sinc_botao_playlist(playlist_exibe);

        playlist_exibe = 1;
    }else{
        document.getElementById("playlist").style.animation = "esconde_playlist .5s";

        playlist_exibe = 0;

        setTimeout(() => {
            document.getElementById("playlist").style.right = "-50%";
        }, 400);

        sinc_botao_playlist(playlist_exibe);
    }
});

function sinc_botao_playlist(caso){
    const btn_mostrar_playlist = document.getElementById("btn_mostrar_playlist");
    
    if(caso){
        btn_mostrar_playlist.style.animation = "abre_lista_playlist .5s";
        btn_mostrar_playlist.style.transform = "rotateZ(180deg)";
    }else{
        btn_mostrar_playlist.style.animation = "fecha_lista_playlist .5s";
        btn_mostrar_playlist.style.transform = "rotateZ(0deg)";
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