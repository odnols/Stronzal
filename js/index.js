var playItem = 0;
var faixas_tocadas = [];
var aleatorio = 0;

var minhaPlayList = [
    {name:"Backbug", artist: "Admiral James T.", mp3: "songs/1.mp3", cover: "https://i.ytimg.com/vi/TAgvRSAbf50/maxresdefault.jpg"},
    {name:"Chaka Train", artist: "Admiral James T.", mp3: "songs/2.mp3", cover: "https://cdn.akamai.steamstatic.com/steam/apps/304730/ss_d058fe206980507fdee0a2cf92f46d9074524966.1920x1080.jpg?t=1596190747"},
    {name:"Dakota", artist: "Admiral James T.", mp3:"songs/3.mp3", cover: "https://cdn.akamai.steamstatic.com/steam/apps/304730/ss_d058fe206980507fdee0a2cf92f46d9074524966.1920x1080.jpg?t=1596190747"},
    {name:"Feet Down Below", artist: "Admiral James T.", mp3:"songs/4.mp3", cover: "https://cdn.akamai.steamstatic.com/steam/apps/304730/ss_d058fe206980507fdee0a2cf92f46d9074524966.1920x1080.jpg?t=1596190747"},
    {name:"Orient Train", artist: "Admiral James T.", mp3:"songs/5.mp3", cover: "https://cdn.akamai.steamstatic.com/steam/apps/304730/ss_d058fe206980507fdee0a2cf92f46d9074524966.1920x1080.jpg?t=1596190747"},
    {name:"New World", artist: "Admiral James T.", mp3:"songs/6.mp3", cover: "https://cdn.akamai.steamstatic.com/steam/apps/304730/ss_d058fe206980507fdee0a2cf92f46d9074524966.1920x1080.jpg?t=1596190747"},
    {name:"Swinging Priest", artist: "Admiral James T.", mp3:"songs/7.mp3", cover: "https://c8.alamy.com/zoomses/9/2b5505906be24d8dac6f11caafc5fc93/ghfmy2.jpg"},
    {name:"Love Train", artist: "Admiral James T.", mp3:"songs/8.mp3", cover: "https://cdn.akamai.steamstatic.com/steam/apps/304730/ss_d058fe206980507fdee0a2cf92f46d9074524966.1920x1080.jpg?t=1596190747"},
    {name:"Trailerpark", artist: "Admiral James T.", mp3:"songs/9.mp3", cover: "https://cdn.akamai.steamstatic.com/steam/apps/304730/ss_d058fe206980507fdee0a2cf92f46d9074524966.1920x1080.jpg?t=1596190747"},
    {name:"Emma", artist: "Admiral James T.", mp3:"songs/10.mp3", cover: "https://rollingstone.uol.com.br/media/uploads/rochelle_bronca_bater_ate_ficar_branco.jpg"}
];

for(let i = 0; i < minhaPlayList.length; i++){
    document.getElementById("faixas_pl").innerHTML += `<br>

    <div class="item_playlist">
        <a href="#" onclick='mudarPlayList(${i})'>
            
            <span class="numero_faixa num_faixa">${i + 1}</span>
            <div class="numero_faixa playing_now">
                <span class="barra_1"></span>
                <span class="barra_2"></span>
                <span class="barra_3"></span>
                <span class="barra_4"></span>
            </div>
            
            <img class="img_cover" src="${minhaPlayList[i]["cover"]}">

            <span class="nome_artista_pl">${minhaPlayList[i]["artist"]}</span><br>
            <span class="nome_faixa_pl">${minhaPlayList[i]["name"]}</span>
        </a>
    </div>
    `;
}

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

$("#jplayer_random").click(function() {
    aleatorio = aleatorio == 0 ? 1 : 0;
    let prev_random = document.getElementsByClassName("status_random");

    if(aleatorio)
        prev_random[0].style.color = "lightseagreen";
    else
        prev_random[0].style.color = "rgb(105, 105, 105)";
});

// Método interno de montagem e exibição da playlist
function exibirPlayList() {
    $("#jplayer_playlist ul").empty();
    for(let i = 0; i < minhaPlayList.length; i++) {
        var listItem = (i == minhaPlayList.length-1) ? "<li class='jplayer_playlist_ultimo_item'>" : "<li>";
        
        // listItem<a href='#' id=`jplayer_playlist_item_${i}` tabindex='1'> + minhaPlayList[i].name +"</a>(<a id='jplayer_playlist_get_mp3_"+ i +"' href='"+ minhaPlayList[i].mp3 +"' tabindex='1'>mp3</a>)</li>";

        $("#jplayer_playlist ul").append(listItem);
        $("#jplayer_playlist_item_"+i).data("index", i)
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

    tocando_agora(index);
    playListConfig(index);

    // Tocando agora
    document.getElementById("nome_artista").innerHTML = minhaPlayList[index]["artist"];
    document.getElementById("nome_faixa").innerHTML = minhaPlayList[index]["name"];
    document.getElementById("fundo_capa").style.backgroundImage = "url("+ minhaPlayList[index]["cover"] +")";

    document.getElementById("capa_album").src = minhaPlayList[index]["cover"];

    $("#jquery_jplayer").jPlayer("play");    
}

// Executa a próxima faixa
function playListProximo() {

    let faixa_escolhida = (playItem + 1 < minhaPlayList.length) ? playItem + 1 : 0;
    
    if(aleatorio){
        if(faixas_tocadas.length == minhaPlayList.length){
            faixas_tocadas = [];
            faixas_tocadas.push(playItem);
        }

        do{
            faixa_escolhida = Math.round((minhaPlayList.length - 1) * Math.random());            
        }while(faixas_tocadas.includes(faixa_escolhida))

        faixas_tocadas.push(faixa_escolhida);
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

function tocando_agora(faixa_atual){
    const tocando_agora = document.getElementsByClassName("playing_now");
    const num_faixa = document.getElementsByClassName("num_faixa");

    for(let i = 0; i < tocando_agora.length; i++){
        tocando_agora[i].style.display = "None";
        num_faixa[i].style.display = "Block";
    }
    
    tocando_agora[faixa_atual].style.display = "Block";
    num_faixa[faixa_atual].style.display = "None";
}