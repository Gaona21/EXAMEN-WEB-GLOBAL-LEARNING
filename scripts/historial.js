const historial = `
<div class="capa-fondo">
        <div class="contenedor-historial">
            <h3 class="titulo-historial">Historial de Partidas</h3>
            <div class="btn-salir">X</div>

            <div class="historial">
            </div>
        </div>
    </div>
`

const btn_historial = document.querySelector("#btn-historial");

btn_historial.addEventListener("click", () => {
    const divMenuSonido = document.createElement("div");
    divMenuSonido.innerHTML = historial;
    document.body.appendChild(divMenuSonido);

    const btn_salir = document.querySelector(".btn-salir");

    btn_salir.addEventListener("click", () => {
        divMenuSonido.remove();
    });

    mostrarPartidas();
});

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

function mostrarPartidas() {
    const partidas = JSON.parse(localStorage.getItem('partidas')) || [];
    const historialDiv = document.querySelector('.historial');

    if (partidas.length > 0) {
        // Clonar y ordenar las partidas para visualización
        const partidasOrdenadas = [...partidas].sort((a, b) => {
            if (a.moves !== b.moves) {
                return a.moves - b.moves;
            } else {
                return a.time - b.time; // Comparar los tiempos como números
            }
        });

        let html = '<ul>';
        partidasOrdenadas.forEach(partida => {
            html += `<li class="filas">Movimientos: ${partida.moves},  Tiempo: ${partida.time} Seg.</li>`;
        });
        html += '</ul>';
        historialDiv.innerHTML = html;
    } else {
        historialDiv.innerHTML = '<p>No hay partidas guardadas.</p>';
    }
}
