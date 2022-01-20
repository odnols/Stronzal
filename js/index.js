var playItem = 0;
var id_faixa_atual = 0;
var id_album_ativo = 0;
var id_playlist_ativa = 0;
var faixas_tocadas = [];
var vol_anterior = 0;
var playlistAtiva = 0;

var playlist_exibe = 0;

var minhaPlayList = [
    {id: 539, mp3:"songs/238425/1.mp3", album: "238425", name:"Skyfall"}
];

function preview_playlist(nome_playlist){

    document.getElementById("faixas_pl").innerHTML = "";

    if(typeof nome_playlist === "undefined")
        document.getElementById("faixas_pl").innerHTML += `<h1 id="playlist_name">${albuns[minhaPlayList[0]["album"]]["name"]}</h1>`;
    else
        document.getElementById("faixas_pl").innerHTML += `<h1 id="playlist_name">${nome_playlist}</h1>`;

    for(let i = 0; i < minhaPlayList.length; i++){

        let faixa_curtida = '<i class="far fa-heart fa-2x curtir_faixa faixa_n_curtida" onclick="curtir_faixa('+ minhaPlayList[i]["id"] +', '+ minhaPlayList[i]["album"] +')"></i>';

        if(faixas_curtidas.includes(`${minhaPlayList[i]["id"]}:${minhaPlayList[i]["album"]}`))
            faixa_curtida = '<i class="fas fa-heart fa-2x curtir_faixa faixa_curtida" onclick="curtir_faixa('+ minhaPlayList[i]["id"] +', '+ minhaPlayList[i]["album"] +')"></i>';

        document.getElementById("faixas_pl").innerHTML += `<br>

        <div class="item_playlist" id="faixa_scroll_0x${i}">
            <a href="#" class="add_faixa_playlist" onclick="opcoes_faixa(${minhaPlayList[i]["id"]}, null, 0)">
                <i class="fa-2x fas fa-ellipsis-v"></i>
            </a>

            <a href="#" onclick='mudarPlayList(${i})'>
                
                <span class="numero_faixa num_faixa_cr num_faixa_${minhaPlayList[i]["id"]}">${i + 1}</span>
                <div class="numero_faixa pl_now_anim playing_now_${minhaPlayList[i]["id"]}">
                    <span class="barra_1"></span>
                    <span class="barra_2"></span>
                    <span class="barra_3"></span>
                    <span class="barra_4"></span>
                </div>
                
                <img class="img_cover" src="${albuns[minhaPlayList[i]["album"]]["cover"]}">

                <span class="nome_faixa_pl">${minhaPlayList[i]["name"]}</span><br>
                <span class="nome_artista_pl">${owners[albuns[minhaPlayList[i]["album"]]["owner"]]}</span>
            </a>

            ${faixa_curtida}
        </div>
        `;
    }
}

function mudarPlayList(index) {

    playListConfig(index);
    tocando_agora(minhaPlayList[index]["id"]);
    id_faixa_atual = minhaPlayList[index]["id"];
    $("#opcoes_fx").hide();
    
    let scrollDiv = document.getElementById("faixa_scroll_0x"+ index); // Scroll a playlist até a faixa atual
    scrollDiv.scrollIntoView({block: "center", behavior: "smooth"});

    // Tocando agora
    document.getElementById("nome_artista").innerHTML = owners[albuns[minhaPlayList[index]["album"]]["owner"]];
    document.getElementById("nome_faixa").innerHTML = minhaPlayList[index]["name"];
    document.getElementById("fundo_capa").style.backgroundImage = "url("+ albuns[minhaPlayList[index]["album"]]["cover"] +")";

    document.getElementById("capa_album").src = albuns[minhaPlayList[index]["album"]]["cover"];

    $("#jquery_jplayer").jPlayer("play");
}

// Executa a próxima faixa
function playListProximo() {

    let faixa_escolhida = (playItem + 1 < minhaPlayList.length) ? playItem + 1 : 0;
    
    if(aleatorio){
        if(minhaPlayList.length > 1){
            if(faixas_tocadas.length == minhaPlayList.length){
                faixas_tocadas = [];
                faixas_tocadas.push(playItem);
            }

            do{
                faixa_escolhida = Math.round((minhaPlayList.length - 1) * Math.random());            
            }while(faixas_tocadas.includes(faixa_escolhida))

            faixas_tocadas.push(faixa_escolhida);
        }
    }

    mudarPlayList(faixa_escolhida);
}

// Executa a faixa anterior
function playListAnterior() {
    
    let faixa_tocada = playItem;

    if(tempoTocado < 5000) // Retorna para a faixa anterior ou reinicia a música atual
        faixa_tocada = (playItem-1 >= 0) ? playItem-1 : minhaPlayList.length - 1;

    mudarPlayList(faixa_tocada);
}

function tocando_agora(id_faixa){

    if(id_faixa !== "auto")
        id_faixa_atual = id_faixa;

    altera_cores(cor_escolhida);

    const esconde_num_faixa = document.getElementsByClassName(`num_faixa_${id_faixa}`);
    const mostra_todas_faixas = document.getElementsByClassName("num_faixa_cr");

    for(let i = 0; i < mostra_todas_faixas.length; i++){ // Mostra o indice de todas as faixas
        mostra_todas_faixas[i].style.display = "Block";
    }
    
    for(let i = 0; i < esconde_num_faixa.length; i++){ // Esconde as faixas que estão tocando
        esconde_num_faixa[i].style.display = "None";
    }

    const encerra_animacao = document.getElementsByClassName("pl_now_anim");
    const mostra_animacao = document.getElementsByClassName(`playing_now_${id_faixa}`);

    for(let i = 0; i < encerra_animacao.length; i++){ // Escondendo todos as faixas
        encerra_animacao[i].style.display = "None";
    }
    
    for(let i = 0; i < mostra_animacao.length; i++){ // Ativa apenas as faixas corretas
        mostra_animacao[i].style.display = "Block";
    }
}

function curtir_faixa(faixa, album){

    if(faixas_curtidas.includes(`${faixa}:${album}`))
        faixas_curtidas.splice(faixas_curtidas.indexOf(`${faixa}:${album}`), 1);
    else
        faixas_curtidas.push(`${faixa}:${album}`);
    
    preview_playlist();

    localStorage.setItem('faixas_curtidas', faixas_curtidas);

    let controles_play = document.getElementsByClassName("top-bar");
    controles_play[0].style.animation = "favorita_faixa 1s 1";

    setTimeout(() => {
        controles_play[0].style.animation = 'None';
    }, 1000);

    atualiza_faixas_curtidas();

    if(id_album_ativo !== 0)
        atualiza_itens_album(id_album_ativo);

    if(id_playlist_ativa !== 0){        
        const dados_album = constroi_playlist(id_playlist_ativa, true);
        dados_playlist_ativa = dados_album;

        atualiza_itens_playlist(id_playlist_ativa);
    }

    document.getElementById("opcoes_fx").style.display = "none";
}

function desliga_som(){
    
    if(volume_musica > 0){
        vol_anterior = volume_musica;
        volume_musica = 0;
    }else
        volume_musica = vol_anterior;
}

function atualiza_faixas_curtidas(){

    tocando_agora(id_faixa_atual);

    let lista_faixas = document.getElementById("lista_faixas_curtidas");
    lista_faixas.innerHTML = "";
    let titl = document.getElementsByClassName("musicas_curtidas");

    if(faixas_curtidas[0] === '' && faixas_curtidas.length === 1)
        faixas_curtidas = []; // Limpa a lista de faixas curtidas

    if(faixas_curtidas.length < 1){
        titl[0].innerHTML = "Você ainda não curtiu nenhum som <i class='fas fa-heart-broken'></i>";
        return;
    }else
        titl[0].innerHTML = "Suas músicas curtidas";

    for(let i = 0; i < faixas_curtidas.length; i++){

        const id_faixa = parseInt(faixas_curtidas[i].split(":")[0]);
        const album_faixa = parseInt(faixas_curtidas[i].split(":")[1]);

        let faixa_curtida = `<i class="far fa-heart fa-2x curtir_faixa faixa_n_curtida" onclick="curtir_faixa(${id_faixa}, ${album_faixa})"></i>`;

        if(faixas_curtidas.includes(faixas_curtidas[i]))
            faixa_curtida = `<i class="fas fa-heart fa-2x curtir_faixa faixa_curtida" onclick="curtir_faixa(${id_faixa}, ${album_faixa})"></i>`;

        let nome_faixa = "";
        
        const album_completo = dados_albuns(album_faixa); // Resgata o nome da faixa
        Object.keys(album_completo).map(function(key) {
            if(album_completo[key]["id"] === id_faixa){
                nome_faixa = album_completo[key]["name"];
            }
        });

        lista_faixas.innerHTML += `<br>

        <div class="item_playlist" id="faixa_scroll_0x${i}">
            
            <a href="#" class="add_faixa_playlist">
                <i class="fa-2x fas fa-ellipsis-v" onclick="opcoes_faixa(${id_faixa}, ${album_faixa}, 0)"></i>
            </a>

            <a href="#" onclick='musicaCurtida(${i}, ${id_faixa}, ${album_faixa})'>
                
                <span class="numero_faixa num_faixa_cr num_faixa_${id_faixa}">${i + 1}</span>
                <div class="numero_faixa pl_now_anim playing_now_${id_faixa}">
                    <span class="barra_1"></span>
                    <span class="barra_2"></span>
                    <span class="barra_3"></span>
                    <span class="barra_4"></span>
                </div>
                
                <img class="img_cover" src="${albuns[album_faixa]["cover"]}">

                <span class="nome_faixa_pl">${nome_faixa}</span><br>
                <span class="nome_artista_pl">${owners[albuns[album_faixa]["owner"]]}</span>
            </a>

            ${faixa_curtida}
        </div>
        `;
    }

    if(id_album_ativo !== 0)
        atualiza_itens_album(id_album_ativo);

    if(id_playlist_ativa !== 0)
        atualiza_itens_playlist(id_playlist_ativa);
}

atualiza_faixas_curtidas();

function atualiza_albuns_curtidos(){

    let lista_albuns = document.getElementById("lista_biblioteca_pessoal");
    lista_albuns.innerHTML = "";
    let titl = document.getElementsByClassName("albuns_curtidos");

    if(faixas_curtidas.length < 1){
        titl[0].innerHTML = "Você ainda não curtiu nenhum álbum <i class='fas fa-heart-broken'></i>";
        // return
    }else
        titl[0].innerHTML = "Seus álbuns curtidos";

    Object.keys(albuns).map(function(key) {
        lista_albuns.innerHTML += `<a href="#" class='item_album_link' onclick='exibe_itens_albuns(${key})'><div class='item_album_curtido item_album_curtido_${key}'>
            <h3 class='nome_item_album_curtido'>${albuns[key]["name"]}</h3>
        </div></a>`;

        let capa_album = document.getElementsByClassName(`item_album_curtido_${key}`);
        capa_album[0].style.backgroundImage = `url(${albuns[key]["cover"]})`;
    
    });
}

atualiza_albuns_curtidos();

function carrega_playlist(id_album, tocador){

    tocando_agora(id_faixa_atual);

    minhaPlayList = dados_albuns(id_album);    
    preview_playlist();

    if(playlist_exibe == 0){
        document.getElementById("playlist").style.animation = "mostra_playlist 1s";

        setTimeout(() => {
            document.getElementById("playlist").style.right = "19px";
        }, 900);

        playlist_exibe = 1;
    }

    sinc_botao_playlist(1);

    if(tocador){
        let inicia = aleatorio != 1 ? 0 : Math.round((minhaPlayList.length - 1) * Math.random());
        mudarPlayList(inicia);
    }
}

function musicaCurtida(indice_curtida, id_faixa, album){

    $("#opcoes_fx").hide();

    let playlistInterna = dados_albuns(album);
    let indice_faixa = 0;
    let nome_faixa = "";

    let i = 0;
    Object.keys(playlistInterna).map(function(key) {
        if(playlistInterna[key]["id"] === id_faixa){
            indice_faixa = i;
            nome_faixa = playlistInterna[key]["name"];
        }

        i++;
    });

    $("#jquery_jplayer").jPlayer("setFile", playlistInterna[indice_faixa].mp3);

    document.getElementById("nome_artista").innerHTML = owners[albuns[album]["owner"]];
    document.getElementById("nome_faixa").innerHTML = nome_faixa;
    document.getElementById("fundo_capa").style.backgroundImage = "url("+ albuns[album]["cover"] +")";

    document.getElementById("capa_album").src = albuns[album]["cover"];

    tocando_agora(id_faixa);
    $("#jquery_jplayer").jPlayer("play"); 
}

function exibe_itens_albuns(id_album){

    if(typeof id_album !== "undefined"){
        id_album_ativo = id_album;
        id_playlist_ativa = 0;
    }
    
    const content_faixas_playlist = document.getElementById("content_faixas_playlist");
    esconde_tudo();

    $("#faixas_playlist").show();

    if(typeof albuns[id_album] != "undefined")
        nome_artista_album = owners[albuns[id_album]["owner"]];

    content_faixas_playlist.innerHTML = `<div id="painel_album"><a href="#" onclick="carrega_playlist(${id_album}, true)"><img id="img_capa_album" src="${albuns[id_album]["cover"]}"></a><span id="tipo_playlist"><i class="fas fa-record-vinyl"></i> Álbum |&nbsp;</span><span id="qtd_faixas">20 faixas</span><h1 id="nome_playlist_album">${albuns[id_album]["name"]}</h1><span id="criador_playlist_album">${nome_artista_album}</span></div>`;

    const dados_album = dados_albuns(id_album);
    document.getElementById("qtd_faixas").innerHTML = dados_album.length > 1 ? `${dados_album.length} faixas` : `1 faixa`;

    let i = 0;
    Object.keys(dados_album).map(function(key) {

        let faixa_curtida = `<i class="far fa-heart fa-2x curtir_faixa faixa_n_curtida" onclick="curtir_faixa(${dados_album[key]["id"]}, ${id_album})"></i>`;
    
        if(faixas_curtidas.includes(`${dados_album[key]["id"]}:${id_album}`))
            faixa_curtida = `<i class="fas fa-heart fa-2x curtir_faixa faixa_curtida" onclick="curtir_faixa(${dados_album[key]["id"]}, ${id_album})"></i>`;

        content_faixas_playlist.innerHTML += `<br>

        <div class="item_playlist" id="faixa_scroll_0x${dados_album[key]["id"]}">
            
            <a href="#" class="add_faixa_playlist" onclick="opcoes_faixa(${dados_album[key]["id"]}, null, 0)">
                <i class="fa-2x fas fa-ellipsis-v"></i>
            </a>

            <a href="#" onclick='musicaCurtida(${i}, ${dados_album[key]["id"]}, ${id_album})'>
                
                <span class="numero_faixa num_faixa_cr num_faixa_${dados_album[key]["id"]}">${i + 1}</span>
                <div class="numero_faixa pl_now_anim playing_now_${dados_album[key]["id"]}">
                    <span class="barra_1"></span>
                    <span class="barra_2"></span>
                    <span class="barra_3"></span>
                    <span class="barra_4"></span>
                </div>
                
                <span class="nome_faixa_pl">${dados_album[key]["name"]}</span><br>
                <span class="nome_artista_pl">${owners[albuns[id_album]["owner"]]}</span>
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
    tocando_agora(id_faixa_atual);
}

function atualiza_itens_album(id_album){

    const content_faixas_playlist = document.getElementById("content_faixas_playlist");

    if(typeof albuns[id_album] != "undefined")
        nome_artista_album = owners[albuns[id_album]["owner"]];

    content_faixas_playlist.innerHTML = `<div id="painel_album"><a href="#" onclick="carrega_playlist(${id_album}, true)"><img id="img_capa_album" src="${albuns[id_album]["cover"]}"></a><span id="tipo_playlist"><i class="fas fa-record-vinyl"></i> Álbum |&nbsp;</span><span id="qtd_faixas">20 faixas</span><h1 id="nome_playlist_album">${albuns[id_album]["name"]}</h1><span id="criador_playlist_album">${nome_artista_album}</span></div>`;

    const dados_album = dados_albuns(id_album);
    document.getElementById("qtd_faixas").innerHTML = dados_album.length > 1 ? `${dados_album.length} faixas` : `1 faixa`;

    let i = 0;
    Object.keys(dados_album).map(function(key) {

        let faixa_curtida = `<i class="far fa-heart fa-2x curtir_faixa faixa_n_curtida" onclick="curtir_faixa(${dados_album[key]["id"]}, ${id_album})"></i>`;
    
        if(faixas_curtidas.includes(`${dados_album[key]["id"]}:${id_album}`))
            faixa_curtida = `<i class="fas fa-heart fa-2x curtir_faixa faixa_curtida" onclick="curtir_faixa(${dados_album[key]["id"]}, ${id_album})"></i>`;

        content_faixas_playlist.innerHTML += `<br>

        <div class="item_playlist" id="faixa_scroll_0x${dados_album[key]["id"]}">
            
            <a href="#" class="add_faixa_playlist" onclick="opcoes_faixa(${dados_album[key]["id"]}, null, 0)">
                <i class="fa-2x fas fa-ellipsis-v"></i>
            </a>

            <a href="#" onclick='musicaCurtida(${i}, ${dados_album[key]["id"]}, ${id_album})'>
                
                <span class="numero_faixa num_faixa_cr num_faixa_${dados_album[key]["id"]}">${i + 1}</span>
                <div class="numero_faixa pl_now_anim playing_now_${dados_album[key]["id"]}">
                    <span class="barra_1"></span>
                    <span class="barra_2"></span>
                    <span class="barra_3"></span>
                    <span class="barra_4"></span>
                </div>
                
                <span class="nome_faixa_pl">${dados_album[key]["name"]}</span><br>
                <span class="nome_artista_pl">${owners[albuns[id_album]["owner"]]}</span>
            </a>

            ${faixa_curtida}
        </div>
        `;

        i++;
    });

    tocando_agora(id_faixa_atual);
}

function carrega_inicio(){

    let constroi_inicio = document.getElementById("play_recomendados");
    constroi_inicio.innerHTML = "";
    
    const albuns_local = [];

    Object.keys(albuns).map(function(key) {
        albuns_local.push(key);
    });
    
    let albuns_recomendados = [];

    for(let i = 0; i < 4; i++){

        do{
            ar = Math.round((albuns_local.length - 1) * Math.random());
        }while(albuns_recomendados.includes(ar));

        albuns_recomendados.push(ar);

        constroi_inicio.innerHTML += `<div class="album_inicio_recomendados"><a href="#" onclick="exibe_itens_albuns(${albuns_local[ar]})"><img class="img_album_recomendado" src="${albuns[albuns_local[ar]]["cover"]}"><h3>${albuns[albuns_local[ar]]["name"].length > 20 ? albuns[albuns_local[ar]]["name"].slice(0, 18) +"..." : albuns[albuns_local[ar]]["name"] }</h3><span >${owners[albuns[albuns_local[ar]]["owner"]]}</span></a></div>`;
    }
}

carrega_inicio();