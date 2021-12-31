var playItem = 0;
var faixas_tocadas = [];
var vol_anterior = 0;

var owners = {
    "8347283" : "Admiral James T."
}

var albuns = {
    "283472" : {
        cover : "https://cdn.akamai.steamstatic.com/steam/apps/304730/ss_d058fe206980507fdee0a2cf92f46d9074524966.1920x1080.jpg?t=1596190747",
        name : "Train Fever Soundtrack",
        likes : 0,
        owner : 8347283
    }
}

var minhaPlayList = [
    {id: 001, mp3:"songs/1.mp3", album: "283472", name:"Backbug"},
    {id: 002, mp3:"songs/2.mp3", album: "283472", name:"Chaka Train"},
    {id: 003, mp3:"songs/3.mp3", album: "283472", name:"Dakota"},
    {id: 004, mp3:"songs/4.mp3", album: "283472", name:"Feet Down Below"},
    {id: 005, mp3:"songs/5.mp3", album: "283472", name:"Orient Train"},
    {id: 006, mp3:"songs/6.mp3", album: "283472", name:"New World"},
    {id: 007, mp3:"songs/7.mp3", album: "283472", name:"Swinging Priest"},
    {id: 020, mp3:"songs/8.mp3", album: "283472", name:"Love Train"},
    {id: 021, mp3:"songs/9.mp3", album: "283472", name:"Trailerpark"},
    {id: 010, mp3:"songs/10.mp3", album: "283472", name:"Emma"},
    {id: 011, mp3:"songs/11.mp3", album: "283472", name:"Chemical Train"},
    {id: 012, mp3:"songs/12.mp3", album: "283472", name:"Disco Reprise"},
    {id: 013, mp3:"songs/13.mp3", album: "283472", name:"Kraftwagen"},
    {id: 014, mp3:"songs/14.mp3", album: "283472", name:"Low Down"},
    {id: 015, mp3:"songs/15.mp3", album: "283472", name:"Lower East"},
    {id: 016, mp3:"songs/16.mp3", album: "283472", name:"Cricket Post"},
    {id: 017, mp3:"songs/17.mp3", album: "283472", name:"Disco (Train Fever Main Menu Theme)"},
];

function preview_playlist(){

    document.getElementById("faixas_pl").innerHTML = "";

    for(let i = 0; i < minhaPlayList.length; i++){

        let faixa_curtida = '<i class="far fa-heart fa-2x curtir_faixa faixa_n_curtida" onclick="curtir_faixa('+ minhaPlayList[i]["id"] +')"></i>';

        if(faixas_curtidas.includes(minhaPlayList[i]["id"]))
            faixa_curtida = '<i class="fas fa-heart fa-2x curtir_faixa faixa_curtida" onclick="curtir_faixa('+ minhaPlayList[i]["id"] +')"></i>';

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
    tocando_agora(playItem);
});

$("#jplayer_pause").click(function() {
    tocando_agora("auto");
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

    tocando_agora(index);
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
    
    if(faixa_atual !== "auto"){
        tocando_agora[faixa_atual].style.display = "Block";
        num_faixa[faixa_atual].style.display = "None";
    }
}

function curtir_faixa(faixa){

    if(faixas_curtidas.includes(faixa))
        faixas_curtidas.splice(faixas_curtidas.indexOf(faixa), 1);
    else
        faixas_curtidas.push(faixa);
    
    preview_playlist();
    tocando_agora(playItem);

    localStorage.setItem('faixas_curtidas', faixas_curtidas);

    let controles_play = document.getElementsByClassName("top-bar");
    controles_play[0].style.animation = "favorita_faixa 1s 1";

    setTimeout(() => {
        controles_play[0].style.animation = 'None';
    }, 1000);
}

// const player = document.getElementById("jqjp_audio_0");
// player.volume = volume_musica || 2 / 100;

function desliga_som(){
    
    if(volume_musica > 0){
        vol_anterior = volume_musica;
        volume_musica = 0;
    }else{
        volume_musica = vol_anterior;
    }
}