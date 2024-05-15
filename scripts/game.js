const totalCards = 16;
const cardImages = ['../img/fila-1-columna-3.png', '../img/fila-1-columna-4.png', '../img/fila-1-columna-5.png', '../img/fila-1-columna-6.png', '../img/fila-1-columna-7.png', '../img/fila-1-columna-8.png', '../img/fila-1-columna-9.png', '../img/fila-1-columna-10.png', '../img/fila-1-columna-11.png', '../img/fila-1-columna-12.png', '../img/fila-2-columna-1.png', '../img/fila-2-columna-2.png', '../img/fila-2-columna-3.png', '../img/fila-2-columna-4.png', '../img/fila-2-columna-5.png', '../img/fila-2-columna-6.png', '../img/fila-2-columna-7.png', '../img/fila-2-columna-8.png', '../img/fila-2-columna-9.png', '../img/fila-2-columna-10.png', '../img/fila-2-columna-11.png', '../img/fila-2-columna-12.png', '../img/fila-3-columna-1.png', '../img/fila-3-columna-3.png', '../img/fila-3-columna-4.png', '../img/fila-3-columna-5.png', '../img/fila-3-columna-6.png', '../img/fila-3-columna-7.png', '../mg/fila-3-columna-8.png', '../img/fila-3-columna-9.png', '../img/fila-3-columna-10.png', '../img/fila-3-columna-11.png', '../img/fila-3-columna-12.png', '../img/fila-4-columna-1.png', '../img/fila-4-columna-2.png', '../img/fila-4-columna-3.png', '../img/fila-4-columna-4.png', '../img/fila-4-columna-5.png', '../img/fila-4-columna-6.png', '../img/fila-4-columna-7.png', '../img/fila-4-columna-8.png', '../img/fila-4-columna-9.png', '../img/fila-4-columna-10.png', '../img/fila-4-columna-11.png', '../img/fila-4-columna-12.png', '../img/fila-1-columna-1.png', '../img/fila-1-columna-2.png'];
let cards = [];
let selectedCards = [];
let valuesUsed = [];
let counter = 0;
let currentMove = 0;
let currentAttempts = 0;
let timer;
const timeLimit = 120;

let cardTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>';


function activate(e) {
   if (currentMove < 2) {
      
      if ((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active') ) {
         e.target.classList.add('active');
         selectedCards.push(e.target);

         if (++currentMove == 2) {

            currentAttempts++;
            document.querySelector('#stats').innerHTML = 'Movimientos: ' + currentAttempts;

            if (selectedCards[0].querySelector('.face img').src === selectedCards[1].querySelector('.face img').src) {
               selectedCards = [];
               currentMove = 0;

               if (document.querySelectorAll('.card.active').length === totalCards) {
                  clearInterval(timer);
                  saveGameStats(currentAttempts, counter);
                  alert("¡Juego terminado!");
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
      time: time
   };
   localStorage.setItem('gameStats', JSON.stringify(gameStats));
}

function loadGameStats() {
   let gameStats =localStorage.getItem('gameStats');
   if (gameStats) {
      gameStats = JSON.parse(gameStats);
      document.querySelector('#last-game-stats').textContent = `Último juego - Movimientos: ${gameStats.moves}, Tiempo: ${gameStats.time} segundos`;
   }
}

loadGameStats();

let images = [...cardImages, ...cardImages];
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

