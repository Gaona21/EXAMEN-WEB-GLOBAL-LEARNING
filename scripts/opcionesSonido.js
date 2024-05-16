let imgSonidoGeneral = "assets/img/icon/musica.png";
let imgSonidoEfecto = "assets/img/icon/sonido.png";
let imgSonidoVolumen = "assets/img/icon/musica.png";

let musicaDeFondo = "assets/sound/Musica de Fondo - Pescado Rabioso .mp3";

const currentPath = window.location.pathname;
const baseUrl = currentPath.includes('pages') ? '../' : './';

//imagenes
imgSonidoGeneral = `${baseUrl}${imgSonidoGeneral}`;
imgSonidoEfecto = `${baseUrl}${imgSonidoEfecto}`;
imgSonidoVolumen = `${baseUrl}${imgSonidoVolumen}`;

//Audios
musicaDeFondo = `${baseUrl}${musicaDeFondo}`;

const audioFondo = new Audio(musicaDeFondo);
audioFondo.loop = true;
// lo de arriba me ayudo chatgpt xd

const menuSonido = `
<div class="capa-fondo">
    <div class="contenedor-menu-sonido">
        <h3 class="titulo-menu-sonido">Sonido</h3>
        <div class="btn-salir">X</div>

        <div class="menu-sonido">
            <div class="cont-sonido-general">
                <h3 class="titulo-subMenu-sonido">Musica</h3>
                <label for="general"><img id="sonido-general" src="${imgSonidoGeneral}" alt=""></label>
                <input type="checkbox" name="sonidoGeneral" id="general">
            </div>

            <div class="cont-efecto-sonido">
            <h3 class="titulo-subMenu-sonido">Efectos</h3>
                <label for="efecto"><img id="sonido-efecto" src="${imgSonidoEfecto}" alt=""></label>
                <input type="checkbox" name="efectoSonido" id="efecto">
            </div>

            <div class="cont-volumen">
                <label for="general"><img id="sonido-volumen" src="${imgSonidoVolumen}" alt=""></label>
                <input type="range" name="volumen" id="volumen">
            </div>
        </div>
    </div>
</div>
`;

const btn_menu_opciones = document.querySelector("#btn-opciones");

btn_menu_opciones.addEventListener("click", () => {
    const divMenuSonido = document.createElement("div");
    divMenuSonido.innerHTML = menuSonido;
    document.body.appendChild(divMenuSonido);

    const btn_salir = document.querySelector(".btn-salir");

    btn_salir.addEventListener("click", () => {
        divMenuSonido.remove();
        audioFondo.pause()
        audioFondo.currentTime = 0;
    });

    audioFondo.play();

    const checkbox_general = document.querySelector("#general");
    const checkbox_efecto = document.querySelector("#efecto");
    const input_volumen = document.querySelector("#volumen");

    if (localStorage.getItem("sonidoGeneral") !== null) {
        console.log(JSON.parse(localStorage.getItem("sonidoGeneral")))
        checkbox_general.checked = JSON.parse(localStorage.getItem("sonidoGeneral"));
    }
    if (localStorage.getItem("efectoSonido") !== null) {
        checkbox_efecto.checked = JSON.parse(localStorage.getItem("efectoSonido"));
    }
    if (localStorage.getItem("volumen") !== null) {
        input_volumen.value = localStorage.getItem("volumen");
    }

    const img_sonido_general = document.querySelector("#sonido-general");
    const img_sonido_efecto = document.querySelector("#sonido-efecto");

    img_sonido_general.style.filter = checkbox_general.checked ? "grayscale(0%)" : "grayscale(100%)";
    img_sonido_efecto.style.filter = checkbox_efecto.checked ? "grayscale(0%)" : "grayscale(100%)";

    checkbox_general.addEventListener("change", () => {
        console.log(checkbox_general.checked)
        const img_sonido_general = document.querySelector("#sonido-general");

        if(!checkbox_general.checked){
            img_sonido_general.style.filter = "grayscale(100%)";
            // input_volumen.value = 0;
            
            audioFondo.pause();
            audioFondo.currentTime = 0;
        }else{
            img_sonido_general.style.filter = "grayscale(0%)";
            
            audioFondo.play();
        }

        localStorage.setItem("sonidoGeneral", checkbox_general.checked);
        // localStorage.setItem("volumen", input_volumen.value);
    });

    checkbox_efecto.addEventListener("change", () => {
        console.log(checkbox_efecto.checked)
        const img_sonido_efecto = document.querySelector("#sonido-efecto");

        if(!checkbox_efecto.checked){
            img_sonido_efecto.style.filter = "grayscale(100%)";
        }else{
            img_sonido_efecto.style.filter = "grayscale(0%)";
        }

        localStorage.setItem("efectoSonido", checkbox_efecto.checked);
    });

    input_volumen.addEventListener("input", () => {
        const volumen = parseFloat(input_volumen.value);
        console.log(input_volumen.value)

        const img_sonido_general = document.querySelector("#sonido-general");
        const img_sonido_volumen = document.querySelector("#sonido-volumen");

        audioFondo.volume = volumen / 100;

        // if(input_volumen.value != 0 && !checkbox_general.checked){
        //     img_sonido_general.style.filter = "grayscale(0%)";
        //     checkbox_general.checked = true;
        // }

        if (volumen > 0 && !checkbox_general.checked) {
            img_sonido_general.style.filter = "grayscale(0%)";
            checkbox_general.checked = true;
            audioFondo.play();
        }

        localStorage.setItem("volumen", input_volumen.value);
        localStorage.setItem("sonidoGeneral", checkbox_general.checked);
    });
});


//algo
function configurarAudio(audioElement) {
    const audioMuted = JSON.parse(localStorage.getItem('audioMuted'));
    const audioVolume = JSON.parse(localStorage.getItem('audioVolume'));

    if (audioMuted !== null) {
        audioElement.pause();
        audioElement.currentTime = 0;
    }

    if (audioVolume !== null) {
        audioElement.volume = audioVolume / 100;
    }
}

configurarAudio(audioFondo);

// if (!audioFondo.muted) {
//     audioFondo.play().catch(error => {
//         console.error('Error al intentar reproducir el audio:', error);
//     });
// }