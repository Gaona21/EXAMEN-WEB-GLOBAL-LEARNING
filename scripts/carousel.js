const btnDerecha = document.querySelector(".btn-derecha");
const btnIzquierda = document.querySelector(".btn-izquierda");

const contCarousel = document.querySelectorAll(".carousel-img");
const listaCarousel = [...contCarousel];

let contador = 0;

btnDerecha.addEventListener("click", () => {
    listaCarousel[contador].classList.toggle("deslizar-derecha");

    setTimeout(() => {
        listaCarousel[contador].classList.toggle("activo");

        setTimeout(() => {
            listaCarousel[contador].classList.toggle("deslizar-derecha");

            if (contador < listaCarousel.length - 1) {
                contador++;
            } else {
                contador = 0;
            }

            listaCarousel[contador].classList.toggle("entrada");
            listaCarousel[contador].classList.toggle("activo");

            setTimeout(() => {
                listaCarousel[contador].classList.toggle("entrada");
            }, 100);
        }, 100);
    }, 300);
});

btnIzquierda.addEventListener("click", () => {
    listaCarousel[contador].classList.toggle("deslizar-izquierda");

    setTimeout(() => {
        listaCarousel[contador].classList.toggle("activo");

        setTimeout(() => {
            listaCarousel[contador].classList.toggle("deslizar-izquierda");
            
            if (contador > 0 && contador <= listaCarousel.length - 1) {
                contador--;
            } else {
                contador = listaCarousel.length - 1;
            }

            listaCarousel[contador].classList.toggle("entrada");
            listaCarousel[contador].classList.toggle("activo");

            setTimeout(() => {
                listaCarousel[contador].classList.toggle("entrada");
            }, 100);
        }, 100);
    }, 300);
});