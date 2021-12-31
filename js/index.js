var playItem = 0;
var faixas_tocadas = [];
var vol_anterior = 0;
var playlistAtiva = 0;
var minhaPlayList = [
    {id: 539, mp3:"songs/238425/1.mp3", album: "238425", name:"Skyfall"}
];

var owners = {
    8347283 : "Admiral James T.",
    1723349 : "Adele",
    4184959 : "C418",
    8553569 : "Supertramp",
    2938356 : "Boney M.",
    3945834 : "Tears For Fears"
}

var albuns = {
    283472 : {
        cover : "https://f4.bcbits.com/img/a3559269778_10.jpg",
        name : "Train Fever Soundtrack",
        likes : 0,
        owner : 8347283
    },
    238425 : {
        cover : "https://upload.wikimedia.org/wikipedia/pt/0/09/Capa_de_Skyfall.jpg",
        name : "Skyfall",
        likes : 0,
        owner : 1723349
    },
    418854 : {
        cover : "https://i.scdn.co/image/ab67616d0000b2734cf0b29eb06a92aa96acae64",
        name : "Minecraft - Volume Beta",
        likes : 0,
        owner : 4184959
    },
    945345 : {
        cover : "https://upload.wikimedia.org/wikipedia/pt/c/cf/Supertramp_-_Breakfast_in_America_%281979%29.jpg",
        name : "Breakfast in America",
        likes : 0,
        owner : 8553569
    },
    485345 : {
        cover : "https://is3-ssl.mzstatic.com/image/thumb/Music124/v4/d9/7d/8d/d97d8df4-d396-92b4-a68d-916718a9d454/dj.vmtarinh.jpg/1200x1200bf-60.jpg",
        name : "Nightflight to Venus",
        likes : 0,
        owner : 2938356
    },
    953452 : {
        cover : "https://i.scdn.co/image/ab67616d0000b2739565c4df27be4aee5edc8009",
        name : "Songs From The Big Chair",
        likes : 0,
        owner : 3945834
    }
}

function preview_playlist(){

    document.getElementById("faixas_pl").innerHTML = "";

    for(let i = 0; i < minhaPlayList.length; i++){

        let faixa_curtida = '<i class="far fa-heart fa-2x curtir_faixa faixa_n_curtida" onclick="curtir_faixa('+ minhaPlayList[i]["id"] +', '+ minhaPlayList[i]["album"] +')"></i>';

        if(faixas_curtidas.includes(`${minhaPlayList[i]["id"]}:${minhaPlayList[i]["album"]}`))
            faixa_curtida = '<i class="fas fa-heart fa-2x curtir_faixa faixa_curtida" onclick="curtir_faixa('+ minhaPlayList[i]["id"] +', '+ minhaPlayList[i]["album"] +')"></i>';

        document.getElementById("faixas_pl").innerHTML += `<br>

        <div class="item_playlist" id="faixa_scroll_0x${i}">
            <a href="#" onclick='mudarPlayList(${i})'>
                
                <span class="numero_faixa num_faixa">${i + 1}</span>
                <div class="numero_faixa playing_now">
                    <span class="barra_1"></span>
                    <span class="barra_2"></span>
                    <span class="barra_3"></span>
                    <span class="barra_4"></span>
                </div>
                
                <img class="img_cover" src="${albuns[minhaPlayList[i]["album"]]["cover"]}">

                <span class="nome_artista_pl">${owners[albuns[minhaPlayList[i]["album"]]["owner"]]}</span><br>
                <span class="nome_faixa_pl">${minhaPlayList[i]["name"]}</span>
            </a>

            ${faixa_curtida}
        </div>
        `;
    }
}

preview_playlist();
var jpTempoExecucao = $("#jplayer_tempo_execucao");
var jpTempoTotal = $("#jplayer_tempo_total");
var tempoTocado = 0;

// Função de criação e configuração do player.
$("#jquery_jplayer").jPlayer({
    ready: function() {
        exibirPlayList();
        playListInit(true); // Parâmetro é um para autoplay.
    },
    oggSupport: false
})
// Configurações gerais do player
.jPlayer("onProgressChange", function(loadPercent, playedPercentRelative, playedPercentAbsolute, playedTime, totalTime) {
    jpTempoExecucao.text($.jPlayer.convertTime(playedTime));
    jpTempoTotal.text($.jPlayer.convertTime(totalTime));

    tempoTocado = playedTime;

    // Barra de progresso
    document.getElementById("progress_bar").style.width = `${playedPercentRelative}%`;
})
.jPlayer("onSoundComplete", function() {
    playListProximo();
});

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
    tocando_agora(playItem, "playing_now", "num_faixa");
});

$("#jplayer_pause").click(function() {
    tocando_agora("auto");
});

$("#btn_pagina_inicial").click(function() {
    esconde_tudo();
    $("#pagina_inicial").show();
});

$("#btn_biblioteca").click(function() {
    esconde_tudo();
    $("#biblioteca_user").show();
});

$("#btn_faixas").click(function() {
    esconde_tudo();
    $("#lista_faixas_curtidas").show();
});

$("#btn_playlists").click(function() {
    esconde_tudo();
    $("#lista_albuns_curtidos").show();
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

function esconde_tudo(){
    $("#pagina_inicial").hide();
    $("#biblioteca_user").hide();
    $("#lista_faixas_curtidas").hide();
    $("#lista_albuns_curtidos").hide();
}

// Método interno de montagem e exibição da playlist
function exibirPlayList() {
    $("#jplayer_playlist ul").empty();
    for(let i = 0; i < minhaPlayList.length; i++) {
        var listItem = (i == minhaPlayList.length-1) ? "<li class='jplayer_playlist_ultimo_item'>" : "<li>";
        
        $("#jplayer_playlist ul").append(listItem);
        $("#jplayer_playlist_item_"+ i).data("index", i)
        .click(function() {
            var index = $(this).data("index");
            if(playItem != index)
                mudarPlayList(index);
            else
                $("#jquery_jplayer").jPlayer("play");
        
            $(this).blur();
            return false;
        });
        $("#jplayer_playlist_get_mp3_"+ i).data("index", i)
        .click(function() {
            var index = $(this).data("index");
            $("#jplayer_playlist_item_"+ index)
            .trigger("click");
            $(this).blur();
            return false;
        });
    }
}

// Inicializa a playlist
function playListInit(autoplay){
    if(autoplay)
        mudarPlayList(playItem);
    else
        playListConfig(playItem);
}

// Configura a playlist (quando a mesma não está por padrão como autoplay)
function playListConfig(index) {
    $("#jplayer_playlist_item_"+ playItem)
    .removeClass("jplayer_playlist_current").parent()
    .removeClass("jplayer_playlist_current");
    $("#jplayer_playlist_item_"+ index)
    .addClass("jplayer_playlist_current").parent()
    .addClass("jplayer_playlist_current");
    playItem = index;
    $("#jquery_jplayer").jPlayer("setFile", minhaPlayList[playItem].mp3, minhaPlayList[playItem].ogg);
}

function mudarPlayList(index) {

    tocando_agora(index, "playing_now", "num_faixa");
    playListConfig(index);

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

function tocando_agora(faixa_atual, alvo_1, alvo_2){
    const tocando_agora = document.getElementsByClassName(alvo_1);
    const num_faixa = document.getElementsByClassName(alvo_2);

    for(let i = 0; i < tocando_agora.length; i++){ // Escondendo todos os itens
        tocando_agora[i].style.display = "None";
        num_faixa[i].style.display = "Block";
    }
    
    if(faixa_atual !== "auto"){
        tocando_agora[faixa_atual].style.display = "Block";
        num_faixa[faixa_atual].style.display = "None";
    }
}

function curtir_faixa(faixa, album){

    if(faixas_curtidas.includes(`${faixa}:${album}`))
        faixas_curtidas.splice(faixas_curtidas.indexOf(`${faixa}:${album}`), 1);
    else
        faixas_curtidas.push(`${faixa}:${album}`);
    
    preview_playlist();
    tocando_agora(playItem, "playing_now", "num_faixa");

    localStorage.setItem('faixas_curtidas', faixas_curtidas);

    let controles_play = document.getElementsByClassName("top-bar");
    controles_play[0].style.animation = "favorita_faixa 1s 1";

    setTimeout(() => {
        controles_play[0].style.animation = 'None';
    }, 1000);

    atualiza_faixas_curtidas();
}

function desliga_som(){
    
    if(volume_musica > 0){
        vol_anterior = volume_musica;
        volume_musica = 0;
    }else{
        volume_musica = vol_anterior;
    }
}

function atualiza_faixas_curtidas(){

    let lista_faixas = document.getElementById("faixas_curtidas_lista");
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
            <a href="#" onclick='musicaCurtida(${i}, ${id_faixa}, ${album_faixa})'>
                
                <span class="numero_faixa_cr num_faixa_cr">${i + 1}</span>
                <div class="numero_faixa_cr playing_now_cr">
                    <span class="barra_1"></span>
                    <span class="barra_2"></span>
                    <span class="barra_3"></span>
                    <span class="barra_4"></span>
                </div>
                
                <img class="img_cover" src="${albuns[album_faixa]["cover"]}">

                <span class="nome_artista_pl">${owners[albuns[album_faixa]["owner"]]}</span><br>
                <span class="nome_faixa_pl">${nome_faixa}</span>
            </a>

            ${faixa_curtida}
        </div>
        `;
    }
}

atualiza_faixas_curtidas();

function atualiza_albuns_curtidos(){

    let lista_albuns = document.getElementById("lista_biblioteca_pessoal");
    lista_albuns.innerHTML = "";
    let titl = document.getElementsByClassName("albuns_curtidos");

    if(faixas_curtidas.length < 1){
        titl[0].innerHTML = "Você ainda não curtiu nenhum albúm <i class='fas fa-heart-broken'></i>";
        // return
    }else
        titl[0].innerHTML = "Seus albúns curtidos";

    Object.keys(albuns).map(function(key) {
        lista_albuns.innerHTML += `<a href="#" class='item_album_link' onclick='carrega_playlist(${key})'><div class='item_album_curtido item_album_curtido_${key}'>
            <h3 class='nome_item_album_curtido'>${albuns[key]["name"]}</h3>
        </div></a>`;

        let capa_album = document.getElementsByClassName(`item_album_curtido_${key}`);
        capa_album[0].style.backgroundImage = `url(${albuns[key]["cover"]})`;
    
    });
}

atualiza_albuns_curtidos();

function carrega_playlist(id_album){

    minhaPlayList = dados_albuns(id_album);    
    preview_playlist();
}

function musicaCurtida(indice_curtida, id_faixa, album){

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

    tocando_agora(indice_curtida, "playing_now_cr", "num_faixa_cr");

    $("#jquery_jplayer").jPlayer("play"); 
}