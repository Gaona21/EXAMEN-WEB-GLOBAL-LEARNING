let musicaDeFondo = "assets/sound/Musica de Fondo - Pescado Rabioso .mp3";
let sonidoCarta = "assets/sound/flipcard.mp3";

const currentPath = window.location.pathname;
const baseUrl = currentPath.includes('pages') ? '../' : './';

musicaDeFondo = `${baseUrl}${musicaDeFondo}`;
sonidoCarta = `${baseUrl}${sonidoCarta}`;

const audioFondo = new Audio(musicaDeFondo);
audioFondo.loop = true;

const audioDeCarta = new Audio(sonidoCarta);

const totalCards = 16;
const cardImages = ['../img/fila-1-columna-3.png', '../img/fila-1-columna-4.png', '../img/fila-1-columna-5.png', '../img/fila-1-columna-6.png', '../img/fila-1-columna-7.png', '../img/fila-1-columna-8.png', '../img/fila-1-columna-9.png', '../img/fila-1-columna-10.png', '../img/fila-1-columna-11.png', '../img/fila-1-columna-12.png', '../img/fila-2-columna-1.png', '../img/fila-2-columna-2.png', '../img/fila-2-columna-3.png', '../img/fila-2-columna-4.png', '../img/fila-2-columna-5.png', '../img/fila-2-columna-6.png', '../img/fila-2-columna-7.png', '../img/fila-2-columna-8.png', '../img/fila-2-columna-9.png', '../img/fila-2-columna-10.png', '../img/fila-2-columna-11.png', '../img/fila-2-columna-12.png', '../img/fila-3-columna-1.png', '../img/fila-3-columna-3.png', '../img/fila-3-columna-4.png', '../img/fila-3-columna-5.png', '../img/fila-3-columna-6.png', '../img/fila-3-columna-7.png', '../img/fila-3-columna-9.png', '../img/fila-3-columna-10.png', '../img/fila-3-columna-11.png', '../img/fila-3-columna-12.png', '../img/fila-4-columna-1.png', '../img/fila-4-columna-2.png', '../img/fila-4-columna-3.png', '../img/fila-4-columna-4.png', '../img/fila-4-columna-5.png', '../img/fila-4-columna-6.png', '../img/fila-4-columna-7.png', '../img/fila-4-columna-8.png', '../img/fila-4-columna-9.png', '../img/fila-4-columna-10.png', '../img/fila-4-columna-11.png', '../img/fila-4-columna-12.png', '../img/fila-1-columna-1.png', '../img/fila-1-columna-2.png'];
let cards = [];
let selectedCards = [];
let valuesUsed = [];
let counter = 0;
let currentMove = 0;
let currentAttempts = 0;
let timer;
const timeLimit = 120;
let cardTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>';

let selectedImages = [];
while (selectedImages.length < totalCards / 2) {
    let randomIndex = Math.floor(Math.random() * cardImages.length);
    let randomImage = cardImages[randomIndex];
    if (selectedImages.indexOf(randomImage) === -1) {
        selectedImages.push(randomImage);
    }
}

function activate(e) {
    if (currentMove < 2) {

        if ((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active')) {
            e.target.classList.add('active');
            selectedCards.push(e.target);

            const efectoMuted = JSON.parse(localStorage.getItem('efectoSonido'));

            if (efectoMuted !== null) {
                audioDeCarta.muted = !efectoMuted;
                if (efectoMuted) {
                    audioDeCarta.volume = 20 / 100;
                    audioDeCarta.play();
                }
            }

            if (++currentMove == 2) {

                currentAttempts++;
                document.querySelector('#stats').innerHTML = 'Movimientos: ' + currentAttempts;

                if (selectedCards[0].querySelector('.face img').src === selectedCards[1].querySelector('.face img').src) {
                    selectedCards = [];
                    currentMove = 0;

                    if (document.querySelectorAll('.card.active').length === totalCards) {
                        clearInterval(timer);
                        saveGameStats(currentAttempts, counter);
                        document.getElementById('modal').style.display = 'block';

                        document.getElementById('restart-btn').addEventListener('click', function () {
                            document.getElementById('modal').style.display = 'none';
                            resetGame();
                        });

                    }

                }

                else {
                    setTimeout(() => {
                        selectedCards[0].classList.remove('active');
                        selectedCards[1].classList.remove('active');
                        selectedCards = [];
                        currentMove = 0;
                    }, 600);
                }
            }
            if (counter === 0) {
                startCounter();
            }
        }
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startCounter() {
    timer = setInterval(() => {
        counter++;
        document.querySelector('#t-restante').textContent = 'Tiempo: ' + counter + ' segundos';
    }, 1000);
}


function saveGameStats(moves, time) {
    let gameStats = {
        moves: moves,
        time: time,
    };

    let partidas = JSON.parse(localStorage.getItem('partidas')) || [];

    partidas.push(gameStats);

    if (partidas.length > 6) {
        partidas.shift();
    }

    localStorage.setItem('partidas', JSON.stringify(partidas));
}

function loadGameStats() {
    let gameStats = localStorage.getItem('gameStats');
    if (gameStats) {
        gameStats = JSON.parse(gameStats);
        document.querySelector('#last-game-stats').textContent = `Último juego - Movimientos: ${gameStats.moves}, Tiempo: ${gameStats.time} segundos`;
    }
}

loadGameStats();


let images = [...selectedImages, ...selectedImages];
shuffle(images);

for (let i = 0; i < totalCards; i++) {
    let div = document.createElement('div');
    div.innerHTML = cardTemplate;
    cards.push(div);
    document.querySelector('#game').append(cards[i]);

    let img = document.createElement('img');
    img.src = images[i];
    cards[i].querySelector('.face').appendChild(img);

    cards[i].querySelector('.card').addEventListener('click', activate);
}

function resetGame() {
    document.querySelector('#game').innerHTML = '';
    cards = [];
    counter = 0;


    let selectedImages = [];
    while (selectedImages.length < totalCards / 2) {
        let randomIndex = Math.floor(Math.random() * cardImages.length);
        let randomImage = cardImages[randomIndex];
        if (selectedImages.indexOf(randomImage) === -1) {
            selectedImages.push(randomImage);
        }
    }

    let images = [...selectedImages, ...selectedImages];
    shuffle(images);

    for (let i = 0; i < totalCards; i++) {
        let div = document.createElement('div');
        div.innerHTML = cardTemplate;
        cards.push(div);
        document.querySelector('#game').append(cards[i]);

        let img = document.createElement('img');
        img.src = images[i];
        cards[i].querySelector('.face').appendChild(img);

        cards[i].querySelector('.card').addEventListener('click', activate);
    }
}

const startGameBtn = document.getElementById('start-game-btn');
const startGameOverlay = document.getElementById('start-game-overlay');

console.log(startGameBtn)

startGameBtn.addEventListener('click', () => {
   
    startGameOverlay.style.display = 'none';
    configurarAudio(audioFondo);
});

function configurarAudio(audioElement) {
    const audioMuted = JSON.parse(localStorage.getItem('sonidoGeneral'));
    const audioVolume = JSON.parse(localStorage.getItem('volumen'));

    if (audioMuted !== null) {
        audioElement.muted = !audioMuted;
        if (audioMuted) {
            audioElement.play();
        }
    }

    if (audioVolume !== null) {
        audioElement.volume = parseFloat(audioVolume) / 100;
    }
}
