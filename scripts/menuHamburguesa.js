document.querySelector('.hamburguesa').addEventListener('click', function() {
    this.classList.toggle('active');
    const barras = document.querySelectorAll('.barra');
    barras[0].classList.toggle('cruz1');
    barras[1].classList.toggle('cruz2');
    barras[2].classList.toggle('cruz3');
    document.querySelector('.lista-subMenu').classList.toggle('active');
});
