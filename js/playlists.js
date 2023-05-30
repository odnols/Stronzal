var posY;
var dados_playlist_ativa = [];

document.querySelector('body').addEventListener('mousemove', function (event) {
    posY = event.clientY;
});

var playlists = {
    2842342: {
        faixas: [111, 112, 113, 850, 851, 986, 395],
        name: "Academia",
        cover: "https://thumbs.gfycat.com/OrneryLegitimateJackal-size_restricted.gif",
        likes: 0
    },
    4958935: {
        faixas: [396, 395, 496, 459, 485, 112, 458, 539],
        name: "Rochelle's",
        cover: "https://adrianojrodrigues.files.wordpress.com/2011/08/chris2.gif",
        likes: 0
    },
    8347534: {
        faixas: [847, 849, 856, 863],
        name: "Rock'n Roll",
        cover: "https://fotos.caras.uol.com.br/media/images/large/2014/07/16/img-619827-roque20140716141405531791.jpg",
        likes: 0
    }
};

function sincroniza_playlists() {
    let lista_playlists = document.getElementById("lista_playlists_criadas");
    lista_playlists.innerHTML = "";
    let titl = document.getElementsByClassName("playlists_criadas");
    titl[0].innerHTML = "Suas playlists";

    Object.keys(playlists).map(function (key) {
        lista_playlists.innerHTML += `<a href="#" class='item_album_link' onclick='constroi_playlist(${key})'><div class='item_album_curtido item_album_curtido_${key}'>
            <h3 class='nome_item_album_curtido'>${playlists[key]["name"]}</h3>
        </div></a>`;

        let capa_album = document.getElementsByClassName(`item_album_curtido_${key}`);
        capa_album[0].style.backgroundImage = `url(${playlists[key]["cover"]})`;
    });
}

function constroi_playlist(id_playlist, req_auto) {

    minhaPlayList_interna = [];

    for (let i = 0; i < playlists[id_playlist]["faixas"].length; i++) {
        let id_album = 0;

        Object.keys(album_static).map(function (key) { // Buscando o ID do álbum
            if (album_static[key].includes(playlists[id_playlist]["faixas"][i]))
                id_album = key;
        });

        let dados_album = dados_albuns(parseInt(id_album));
        Object.keys(dados_album).map(function (key) { // Buscando o ID do álbum
            if (dados_album[key]["id"] == playlists[id_playlist]["faixas"][i])
                minhaPlayList_interna.push(dados_album[key]);
        });
    }

    if (req_auto)
        return minhaPlayList_interna;

    exibe_itens_playlist(minhaPlayList_interna, id_playlist);
    sinc_botao_playlist(1);
}

function exibe_itens_playlist(dados_playlist_ativa, id_playlist) {

    if (typeof id_playlist !== "undefined") {
        id_playlist_ativa = id_playlist;
        id_album_ativo = 0;

        const dados_album = constroi_playlist(id_playlist, true);
        dados_playlist_ativa = dados_album;
    }

    const content_faixas_playlist = document.getElementById("content_faixas_playlist");
    esconde_tudo();

    $("#faixas_playlist").show();

    nome_artista_album = "Slondo"
    content_faixas_playlist.innerHTML = `<div id="painel_album"><a href="#" onclick="carrega_playlist_pers(${id_playlist})"><img id="img_capa_album" src="${playlists[id_playlist]["cover"]}"></a><span id="tipo_playlist"><i class="fas fa-compact-disc"></i> Playlist |&nbsp;</span><span id="qtd_faixas">20 faixas</span><h1 id="nome_playlist_album">${playlists[id_playlist]["name"]}</h1><span id="criador_playlist_album">${nome_artista_album}</span></div>`;

    document.getElementById("qtd_faixas").innerHTML = dados_playlist_ativa.length > 1 ? `${dados_playlist_ativa.length} faixas` : `1 faixa`;

    let i = 0;
    Object.keys(dados_playlist_ativa).map(function (key) {

        let faixa_curtida = `<i class="far fa-heart fa-2x curtir_faixa faixa_n_curtida" onclick="curtir_faixa(${dados_playlist_ativa[key]["id"]}, ${dados_playlist_ativa[key]["album"]})"></i>`;

        if (faixas_curtidas.includes(`${dados_playlist_ativa[key]["id"]}:${dados_playlist_ativa[key]["album"]}`))
            faixa_curtida = `<i class="fas fa-heart fa-2x curtir_faixa faixa_curtida" onclick="curtir_faixa(${dados_playlist_ativa[key]["id"]}, ${dados_playlist_ativa[key]["album"]})"></i>`;

        content_faixas_playlist.innerHTML += `<br>

        <div class="item_playlist" id="faixa_scroll_0x${dados_playlist_ativa[key]["id"]}">
            
            <a href="#" class="add_faixa_playlist">
                <i class="fa-2x fas fa-ellipsis-v" onclick="opcoes_faixa(${dados_playlist_ativa[key]["id"]}, ${id_playlist}, 1)"></i>
            </a>

            <a href="#" onclick='musicaCurtida(${i}, ${dados_playlist_ativa[key]["id"]}, ${dados_playlist_ativa[key]["album"]})'>
                
                <span class="numero_faixa num_faixa_cr num_faixa_${dados_playlist_ativa[key]["id"]}">${i + 1}</span>
                <div class="numero_faixa pl_now_anim playing_now_${dados_playlist_ativa[key]["id"]}">
                    <span class="barra_1"></span>
                    <span class="barra_2"></span>
                    <span class="barra_3"></span>
                    <span class="barra_4"></span>
                </div>
                
                <span class="nome_faixa_pl">${dados_playlist_ativa[key]["name"]}</span><br>
                <span class="nome_artista_pl">${owners[albuns[dados_playlist_ativa[key]["album"]]["owner"]]}</span>
            </a>

            ${faixa_curtida}
        </div>
        `;

        i++;
    });

    if (playlist_exibe == 0) {
        document.getElementById("playlist").style.animation = "mostra_playlist 1s";

        setTimeout(() => {
            document.getElementById("playlist").style.right = "19px";
        }, 900);

        playlist_exibe = 1;
    }

    sinc_botao_playlist(1);
    tocando_agora(id_faixa_atual);
}

function atualiza_itens_playlist(id_playlist) {

    const content_faixas_playlist = document.getElementById("content_faixas_playlist");

    nome_artista_album = "Slondo"
    content_faixas_playlist.innerHTML = `<div id="painel_album"><a href="#" onclick="carrega_playlist_pers(${id_playlist})"><img id="img_capa_album" src="${playlists[id_playlist]["cover"]}"></a><span id="tipo_playlist"><i class="fas fa-compact-disc"></i> Playlist |&nbsp;</span><span id="qtd_faixas">20 faixas</span><h1 id="nome_playlist_album">${playlists[id_playlist]["name"]}</h1><span id="criador_playlist_album">${nome_artista_album}</span></div>`;

    document.getElementById("qtd_faixas").innerHTML = dados_playlist_ativa.length > 1 ? `${dados_playlist_ativa.length} faixas` : `1 faixa`;

    let i = 0;
    Object.keys(dados_playlist_ativa).map(function (key) {

        let faixa_curtida = `<i class="far fa-heart fa-2x curtir_faixa faixa_n_curtida" onclick="curtir_faixa(${dados_playlist_ativa[key]["id"]}, ${dados_playlist_ativa[key]["album"]})"></i>`;

        if (faixas_curtidas.includes(`${dados_playlist_ativa[key]["id"]}:${dados_playlist_ativa[key]["album"]}`))
            faixa_curtida = `<i class="fas fa-heart fa-2x curtir_faixa faixa_curtida" onclick="curtir_faixa(${dados_playlist_ativa[key]["id"]}, ${dados_playlist_ativa[key]["album"]})"></i>`;

        content_faixas_playlist.innerHTML += `<br>

        <div class="item_playlist" id="faixa_scroll_0x${dados_playlist_ativa[key]["id"]}">
            
            <a href="#" class="add_faixa_playlist">
                <i class="fa-2x fas fa-ellipsis-v" onclick="opcoes_faixa(${dados_playlist_ativa[key]["id"]}, ${id_playlist}, 1)"></i>
            </a>

            <a href="#" onclick='musicaCurtida(${i}, ${dados_playlist_ativa[key]["id"]}, ${dados_playlist_ativa[key]["album"]})'>
                
                <span class="numero_faixa num_faixa_cr num_faixa_${dados_playlist_ativa[key]["id"]}">${i + 1}</span>
                <div class="numero_faixa pl_now_anim playing_now_${dados_playlist_ativa[key]["id"]}">
                    <span class="barra_1"></span>
                    <span class="barra_2"></span>
                    <span class="barra_3"></span>
                    <span class="barra_4"></span>
                </div>
                
                <span class="nome_faixa_pl">${dados_playlist_ativa[key]["name"]}</span><br>
                <span class="nome_artista_pl">${owners[albuns[dados_playlist_ativa[key]["album"]]["owner"]]}</span>
            </a>

            ${faixa_curtida}
        </div>
        `;

        i++;
    });

    sinc_botao_playlist(1);
    tocando_agora(id_faixa_atual);
}

function carrega_playlist_pers(id_playlist) {

    const dados_album = constroi_playlist(id_playlist, true);
    dados_playlist_ativa = dados_album;

    minhaPlayList = dados_album;
    sinc_botao_playlist(1);
    preview_playlist(playlists[id_playlist]["name"]);

    let inicia = aleatorio != 1 ? 0 : Math.round((dados_playlist_ativa.length - 1) * Math.random());
    mudarPlayList(inicia);

    $("#jquery_jplayer").jPlayer("play");
}

function remove_faixa_playlist(id_playlist, id_faixa) {

    playlists[id_playlist]["faixas"].splice(playlists[id_playlist]["faixas"].indexOf(id_faixa), 1);

    const dados_album = constroi_playlist(id_playlist, true);
    dados_playlist_ativa = dados_album;

    atualiza_itens_playlist(id_playlist);
    document.getElementById("opcoes_fx").style.display = "none";
}

function adiciona_faixa_playlist(id_playlist, id_faixa, req_auto) {

    let nova_playlist = playlists[id_playlist]["faixas"];
    nova_playlist.push(id_faixa);

    playlists[id_playlist]["faixas"] = nova_playlist;

    const dados_album = constroi_playlist(id_playlist, true);
    dados_playlist_ativa = dados_album;

    if (req_auto)
        atualiza_itens_playlist(id_playlist);

    document.getElementById("opcoes_fx").style.display = "none";
}

sincroniza_playlists();