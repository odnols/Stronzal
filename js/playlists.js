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

    minhaPlayList = minhaPlayList_interna;
    preview_playlist(playlists[id_playlist]["name"]);

    if(playlist_exibe == 0){
        document.getElementById("playlist").style.animation = "mostra_playlist 1s";

        setTimeout(() => {
            document.getElementById("playlist").style.right = "19px";
        }, 900);

        playlist_exibe = 1;
    }

    sinc_botao_playlist(1);
}

sincroniza_playlists();