const totalCards = 16;
let cards = [];
let selectedCards = [];
let valuesUsed = [];
let counter = 0;
let currentMove = 0;
let currentAttempts = 0;

let cardTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>';


function activate(e) {
   if (currentMove < 2) {
      
      if ((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active') ) {
         e.target.classList.add('active');
         selectedCards.push(e.target);

         if (++currentMove == 2) {

            currentAttempts++;
            document.querySelector('#stats').innerHTML = currentAttempts + 'intentos';

            if (selectedCards[0].querySelectorAll('.face')[0].innerHTML == selectedCards[1].querySelectorAll('.face')[0].innerHTML) {
               selectedCards = [];
               currentMove = 0;

               if (selectedCards.length === totalCards) {
                  clearInterval(timer);
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
            document.querySelector('#t-restante').textContent = 'Tiempo: ' + counter+ 'segundos';
         }
      }
   }
}

function randomValue() {
   let random = Math.floor(Math.random() * totalCards * 0.5);
   let values = valuesUsed.filter(value => value === random);
   if (values.length < 2) {
      valuesUsed.push(random);
   }
   else {
      randomValue();
   }
}



for (let i=0; i < totalCards; i++) {
   let div = document.createElement('div');
   div.innerHTML = cardTemplate;
   cards.push(div);
   document.querySelector('#game').append(cards[i]);
   randomValue();
   cards[i].querySelectorAll('.face')[0].innerHTML = valuesUsed[i];
   cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);
}

function startCounter() {
   timer = setInterval(() => {
       counter++;
       document.querySelector('#t-restante').textContent = 'Tiempo: ' + counter + ' segundos';
   }, 1000);
}