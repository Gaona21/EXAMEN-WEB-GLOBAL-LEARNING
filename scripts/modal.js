const modalContent = `
<div id="modal" class="modal">
<div class="modal-content">
    <h2>Fin del juego</h2>
    <button id="restart-btn">Reiniciar</button>
    <a href="../index.html"><button id="restart-btn">Salir</button></a>
</div>
</div>
`;

document.body.insertAdjacentHTML('beforeend', modalContent);