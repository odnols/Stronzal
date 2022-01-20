preview_playlist();
var jpTempoExecucao = $("#jplayer_tempo_execucao");
var jpTempoTotal = $("#jplayer_tempo_total");
var porcentagemTocada = 0;
var porcent_player_global = 0;

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

    if(!tempo_total_reverso)
        jpTempoTotal.text($.jPlayer.convertTime(totalTime));
    else
        jpTempoTotal.text(`- ${$.jPlayer.convertTime(totalTime - playedTime)}`);

    porcentagemTocada = playedPercentRelative;

    // Barra de progresso
    document.getElementById("progress_bar").style.width = `${playedPercentRelative}%`;
})
.jPlayer("onSoundComplete", function() {
    playListProximo();
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

            if(playItem !== index)
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

    console.log(indice_faixa_atual);

    if(autoplay)
        mudarPlayList(indice_faixa_atual);
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

function altera_tempo_tocado(){

    let a = document.getElementById("barra_progresso");
    let b = document.getElementById("opcs_progress");
    const distancia_left = a.offsetLeft + b.offsetLeft;

    let e = window.event;
    let posX = e.clientX;

    $("#jquery_jplayer").jPlayer("playHead", (100 * (distancia_left - posX) / 430) * -1);
}

// Salva alguns dados antes de fechar a janela
window.addEventListener("unload", function(){
    localStorage.setItem("playlist_ativa", JSON.stringify(minhaPlayList));
    localStorage.setItem("musica_ativa_h", id_faixa_atual);
    localStorage.setItem("indice_faixa_ativa_h", indice_faixa_atual);

    localStorage.setItem("timeline_progress", porcentagemTocada);
});