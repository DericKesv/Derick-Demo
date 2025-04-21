function cargarArmas(modo) {
  fetch(`data/${modo}.json`)
    .then(res => res.json())
    .then(data => {
      document.getElementById('titulo').textContent = `Armamento de ${modo === 'warzone' ? 'Warzone' : 'Black Ops 6'}`;
      document.getElementById('modos-principales').style.display = 'none';

      const contenedor = document.getElementById('armas-container');
      contenedor.innerHTML = '';

      data.forEach(arma => {
        contenedor.innerHTML += `
          <div class="arma-card">
            <img src="${arma.imagen}" alt="${arma.nombre}" />
            <h3>${arma.nombre}</h3>
            <p>Tipo: ${arma.tipo}</p>
          </div>
        `;
      });
    });
}

function cargarModoDesdeBoton(modo) {
  document.getElementById('modos-principales').style.display = 'none';
  cargarArmas(modo);
}
