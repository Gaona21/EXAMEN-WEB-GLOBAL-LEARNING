const modalContent = `
<div id="modal" class="modal">
<div class="modal-content">
    <h2>!Ganaste!</h2>
    <h2>Deseas volver a empezar?<h2/>
    <button id="restart-btn">Reiniciar</button>
    <a href="../index.html"><button id="exit-btn">Salir</button></a>
</div>
</div>
`;

document.body.insertAdjacentHTML('beforeend', modalContent);

