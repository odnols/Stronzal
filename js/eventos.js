var menu_configuracoes = 0;
var id_faixa_anterior;

// Captura o evento de clique para o botão de anterior
$("#jplayer_anterior").click(function () {
    playListAnterior();
    $(this).blur();
    return false;
});

// Captura o evento de clique para o botão de próximo
$("#jplayer_proximo").click(function () {
    playListProximo();
    $(this).blur();
    return false;
});

$("#jplayer_play").click(function () {
    tocando_agora(id_faixa_atual);
});

$("#jplayer_pause").click(function () {
    tocando_agora("auto");
});

$("#btn_pagina_inicial").click(function () {
    esconde_tudo();
    $("#pagina_inicial").show();
    document.getElementById("playlist").style.animation = "esconde_playlist 1s";

    playlist_exibe = 0;

    setTimeout(() => {
        document.getElementById("playlist").style.right = "-50%";
    }, 800);

    sinc_botao_playlist(0);
    carrega_inicio(true);
});

$("#btn_biblioteca").click(function () {
    esconde_tudo();
    $("#biblioteca_user").show();
});

$("#btn_faixas").click(function () {
    esconde_tudo();
    $("#faixas_curtidas").show();
});

$("#btn_playlists").click(function () {
    esconde_tudo();
    $("#playlists_criadas").show();

    sincroniza_playlists();
});

$("#jplayer_tempo_total").click(function () {

    if (tempo_total_reverso)
        tempo_total_reverso = 0;
    else
        tempo_total_reverso = 1;

    localStorage.setItem("tempo_total_reverso", tempo_total_reverso);
});

$("#btn_abrir_configuracoes").click(function () {

    const config = document.getElementById("configuracoes");

    if (menu_configuracoes === 0) {
        $("#configuracoes").show();
        menu_configuracoes = 1;
        document.getElementById("playlist").scrollTop = 0;

        config.style.animation = "abre_configuracoes .5s";
        config.style.padding = "15px";

        setTimeout(() => {
            config.style.height = "100%";

            config.style.animation = "none";
        }, 450);

        document.getElementById("playlist").style.overflowY = "hidden";
    } else {
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

$("#jplayer_random").click(function () {
    aleatorio = aleatorio == 0 ? 1 : 0;
    let prev_random = document.getElementsByClassName("status_random");

    const cores = cores_disponiveis();

    if (aleatorio)
        prev_random[0].style.color = `${cores[cor_escolhida][0]}`;
    else
        prev_random[0].style.color = "rgb(105, 105, 105)";

    localStorage.setItem('random_stronzal', aleatorio);
});

$("#jplayer_repeat").click(function () {
    repeteco = repeteco == 0 ? 1 : 0;
    let prev_repeat = document.getElementsByClassName("status_repeteco");

    const cores = cores_disponiveis();

    if (repeteco)
        prev_repeat[0].style.color = `${cores[cor_escolhida][0]}`;
    else
        prev_repeat[0].style.color = "rgb(105, 105, 105)";

    localStorage.setItem('repeteco_stronzal', repeteco);
});

$("#btn_mostrar_playlist").click(function () {

    if (playlist_exibe === 0) {

        document.getElementById("playlist").style.animation = "mostra_playlist .5s";

        setTimeout(() => {
            document.getElementById("playlist").style.right = "19px";
        }, 400);

        playlist_exibe = 1;

        sinc_botao_playlist(playlist_exibe);

        playlist_exibe = 1;
    } else {
        document.getElementById("playlist").style.animation = "esconde_playlist .5s";

        playlist_exibe = 0;

        setTimeout(() => {
            document.getElementById("playlist").style.right = "-50%";
        }, 400);

        sinc_botao_playlist(playlist_exibe);
    }
});

function sinc_botao_playlist(caso) {
    const btn_mostrar_playlist = document.getElementById("btn_mostrar_playlist");

    if (caso) {
        btn_mostrar_playlist.style.animation = "abre_lista_playlist .5s";
        btn_mostrar_playlist.style.transform = "rotateZ(180deg)";
    } else {
        btn_mostrar_playlist.style.animation = "fecha_lista_playlist .5s";
        btn_mostrar_playlist.style.transform = "rotateZ(0deg)";
    }

    if (!playlist_exibe) {
        document.getElementById("lista_biblioteca_pessoal").style.width = "70%";
        document.getElementById("lista_playlists_criadas").style.width = "70%";
    } else {
        document.getElementById("lista_biblioteca_pessoal").style.width = "55%";
        document.getElementById("lista_playlists_criadas").style.width = "55%";
    }
}

function esconde_tudo() {
    $("#pagina_inicial").hide();
    $("#biblioteca_user").hide();
    $("#faixas_curtidas").hide();
    $("#playlists_criadas").hide();
    $("#faixas_playlist").hide();
    $("#opcoes_fx").hide();
}

function opcoes_faixa(id_faixa, id_playlist, alvo) {

    if (alvo) {
        const dados_album = constroi_playlist(id_playlist, true);
        dados_playlist_ativa = dados_album;
    }

    let opcoes_fx = document.getElementById("opcoes_fx");
    opcoes_fx.style.maxWidth = "200px";
    opcoes_fx.style.width = "200px";

    $("#opcoes_fx").show();

    if (id_faixa === id_faixa_anterior) {
        $("#opcoes_fx").toggle();
        id_faixa_anterior = null
    } else
        id_faixa_anterior = id_faixa;

    opcoes_fx.style.top = `${posY}px`;

    Object.keys(album_static).map(function (key) { // Buscando o ID do álbum
        if (album_static[key].includes(id_faixa))
            id_album = key;
    });

    let faixa_curtida = faixas_curtidas.includes(`${id_faixa}:${id_album}`) ? "Descurtir faixa" : "Curtir faixa";

    if (alvo) {
        opcoes_fx.innerHTML = `
            <a href="#" onclick="remove_faixa_playlist(${id_playlist}, ${id_faixa})">Remover da playlist</a><hr>
            <a href="#" onclick="add_playlist(${id_faixa}, ${id_playlist}, ${alvo})">Adicionar a uma playlist</a><hr>
            <a href="#" onclick="curtir_faixa(${id_faixa}, ${id_album})">${faixa_curtida}</a>
        `;
    } else {
        opcoes_fx.innerHTML = `
            <a href="#" onclick="add_playlist(${id_faixa}, ${id_playlist}, ${alvo})">Adicionar a uma playlist</a> <hr>
            <a href="#" onclick="curtir_faixa(${id_faixa}, ${id_album})">${faixa_curtida}</a>
        `;
    }
}

function add_playlist(id_faixa, id_playlist, alvo) {

    let opcoes_fx = document.getElementById("opcoes_fx");
    opcoes_fx.style.maxWidth = "300px";
    opcoes_fx.style.width = "300px";

    opcoes_fx.innerHTML = `<a href="#" onclick="opcoes_faixa(${id_faixa}, ${id_playlist}, ${alvo})">Cancelar</a>`;

    Object.keys(playlists).map(function (key) {
        opcoes_fx.innerHTML += `<hr><a href="#" onclick='adiciona_faixa_playlist(${key}, ${id_faixa}, ${alvo})'>${playlists[key]["name"].length > 20 ? playlists[key]["name"].slice(0, 17) + "..." : playlists[key]["name"]}
        </div></a>`;
    });
}