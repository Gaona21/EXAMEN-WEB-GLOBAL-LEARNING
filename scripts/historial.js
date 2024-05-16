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

    // Llamada a la función para mostrar las partidas
    mostrarPartidas();
});

function saveGameStats(moves, time) {

    // Crear objeto de estadística de partida
    let gameStats = {
        moves: moves,
        time: time,
    };

    // Obtener las partidas guardadas en localStorage
    let partidas = JSON.parse(localStorage.getItem('partidas')) || [];

    // Añadir la nueva partida
    partidas.push(gameStats);

    // Si hay más de 6 partidas, eliminar la más antigua
    if (partidas.length > 6) {
        partidas.shift();
    }

    // Guardar el array actualizado en localStorage
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
                return a.time.localeCompare(b.time);
            }
        });

        let html = '<ul>';
        partidasOrdenadas.forEach(partida => {
            html += `<li class="filas">Movimientos: ${partida.moves},  Tiempo: ${partida.time}</li>`;
        });
        html += '</ul>';
        historialDiv.innerHTML = html;
    } else {
        historialDiv.innerHTML = '<p>No hay partidas guardadas.</p>';
    }
}