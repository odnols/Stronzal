var cor_escolhida = carrega_cor();

function palheta_cores(){

    const cores = cores_disponiveis();

    const palhetas = document.getElementById("cores_personalizadas");

    Object.keys(cores).map(function(key) {
        palhetas.innerHTML += `<br>
        
        <div class="prancheta_palhetas" onclick="altera_cores(${key})">
            <div class="icon_palheta_cor" style="background-color: ${cores[key][0]}"></div>
            <div class="icon_palheta_cor" style="background-color: ${cores[key][1]}"></div>
            <div class="icon_palheta_cor" style="background-color: ${cores[key][2]}"></div>
        </div>
        `;
    });
}

palheta_cores();

function altera_cores(id_cores){

    const cores = cores_disponiveis();

    document.getElementById("progress_bar").style.backgroundColor = `${cores[id_cores][0]}`;
    document.getElementById("bg_stronzal").style.backgroundColor = `${cores[id_cores][1]}`;
    
    const itens_classes = ["bc:jp-volume-bar-value:0", "bc:barra_1:0", "bc:barra_2:0", "bc:barra_3:0", "bc:barra_4:0", "c:icons_nav:0", "c:faixa_curtida:0", "f:faixa_curtida:0"];

    for(let i = 0; i < itens_classes.length; i++){
        let alvos = document.getElementsByClassName(itens_classes[i].split(":")[1]);

        for(let x = 0; x < alvos.length; x++){
            if(itens_classes[i].split(":")[0] === "bc")
                alvos[x].style.backgroundColor = `${cores[id_cores][itens_classes[i].split(":")[2]]}`;
            else if(itens_classes[i].split(":")[0] === "c")
                alvos[x].style.color = `${cores[id_cores][itens_classes[i].split(":")[2]]}`;
            else
                alvos[x].style.filter = `drop-shadow(0px 0px 3px ${cores[id_cores][0]})`;
        }
    }

    let links = document.getElementsByTagName("a");
    for(let i = 0; i < links.length; i++){
        links[i].style.color.hover = `${cores[id_cores][0]}`;
    }
    
    let preview_album = document.getElementsByClassName("player-display")
     
    preview_album[0].style.background = `linear-gradient(0deg, rgba(0,0,0,1) 0%, ${cores[id_cores][2]} 19%, rgba(0,212,255,0) 100%)`;
    
    cor_escolhida = id_cores;
    localStorage.setItem("cor_destaque_stronzal", cor_escolhida);
}

altera_cores(cor_escolhida);