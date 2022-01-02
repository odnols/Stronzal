var playlists = {
    2842342 : {
        faixas : [111, 112, 113, 850, 851, 986, 395],
        name : "Academia",
        cover : "https://thumbs.gfycat.com/OrneryLegitimateJackal-size_restricted.gif",
        likes : 0
    }
};

function sincroniza_playlists(){
    let lista_playlists = document.getElementById("lista_playlists_criadas");
    lista_playlists.innerHTML = "";
    let titl = document.getElementsByClassName("playlists_criadas");

    // if(playlists.length < 2){
    //     titl[0].innerHTML = "Você ainda não criou nenhuma playlist <i class='fas fa-heart-broken'></i>";
    //     // return
    // }else
        titl[0].innerHTML = "Suas playlists";

    Object.keys(playlists).map(function(key) {
        lista_playlists.innerHTML += `<a href="#" class='item_album_link' onclick='constroi_playlist(${key})'><div class='item_album_curtido item_album_curtido_${key}'>
            <h3 class='nome_item_album_curtido'>${playlists[key]["name"]}</h3>
        </div></a>`;

        let capa_album = document.getElementsByClassName(`item_album_curtido_${key}`);
        capa_album[0].style.backgroundImage = `url(${playlists[key]["cover"]})`;
    });
}

function constroi_playlist(id_playlist){
    
    minhaPlayList_interna = [];

    for(let i = 0; i < playlists[id_playlist]["faixas"].length; i++){
        let id_album = 0;
  
        Object.keys(album_static).map(function(key) { // Buscando o ID do álbum
            if(album_static[key].includes(playlists[id_playlist]["faixas"][i]))
                id_album = key;
        });

        let dados_album = dados_albuns(parseInt(id_album));
        Object.keys(dados_album).map(function(key) { // Buscando o ID do álbum
            if(dados_album[key]["id"] == playlists[id_playlist]["faixas"][i])
                minhaPlayList_interna.push(dados_album[key]);
        });
    }

    exibe_itens_playlist(minhaPlayList_interna, id_playlist);
    sinc_botao_playlist(1);
}

sincroniza_playlists();

function exibe_itens_playlist(dados_album, id_playlist){

    const content_faixas_playlist = document.getElementById("content_faixas_playlist");
    esconde_tudo();

    $("#faixas_playlist").show();

    nome_artista_album = "Slondo"

    content_faixas_playlist.innerHTML = `<div id="painel_album"><a href="#"><img id="img_capa_album" src="${playlists[id_playlist]["cover"]}"></a><h1 id="nome_playlist_album">${playlists[id_playlist]["name"]}</h1><span id="criador_playlist_album">${nome_artista_album}</span></div></a>`;

    console.log(dados_album);

    let i = 0;
    Object.keys(dados_album).map(function(key) {

        let faixa_curtida = `<i class="far fa-heart fa-2x curtir_faixa faixa_n_curtida" onclick="curtir_faixa(${dados_album[key]["id"]}, ${dados_album[key]["album"]})"></i>`;

        if(faixas_curtidas.includes(dados_album[key]["id"]))
            faixa_curtida = `<i class="fas fa-heart fa-2x curtir_faixa faixa_curtida" onclick="curtir_faixa(${dados_album[key]["id"]}, ${dados_album[key]["album"]})"></i>`;

        content_faixas_playlist.innerHTML += `<br>

        <div class="item_playlist" id="faixa_scroll_0x${dados_album[key]["id"]}">
            
            <a href="#" class="add_faixa_playlist" onclick="add_playlist()">
                <i class="fa-2x fas fa-ellipsis-v"></i>
            </a>

            <a href="#" onclick='musicaCurtida(${i}, ${dados_album[key]["id"]}, ${dados_album[key]["album"]})'>
                
                <span class="numero_faixa_cr num_faixa_cr">${i + 1}</span>
                <div class="numero_faixa_cr playing_now_cr">
                    <span class="barra_1"></span>
                    <span class="barra_2"></span>
                    <span class="barra_3"></span>
                    <span class="barra_4"></span>
                </div>
                
                <span class="nome_faixa_pl">${dados_album[key]["name"]}</span><br>
                <span class="nome_artista_pl">${owners[albuns[dados_album[key]["album"]]["owner"]]}</span>
            </a>

            ${faixa_curtida}
        </div>
        `;

        i++;
    });

    if(playlist_exibe == 0){
        document.getElementById("playlist").style.animation = "mostra_playlist 1s";

        setTimeout(() => {
            document.getElementById("playlist").style.right = "19px";
        }, 900);

        playlist_exibe = 1;
    }

    sinc_botao_playlist(1);
}