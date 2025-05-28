// Obtener el folio desde la URL
const urlParams = new URLSearchParams(window.location.search);
const folio = urlParams.get("folio");

// Elementos del DOM
const lugarEnvio = document.getElementById("LugarEnvio");
const lugarDestino = document.getElementById("LugarDestino");
const datoFolio = document.getElementById("DatoFolio");
const costoEnvio = document.getElementById("costoEnvio");
const fechaEnvio = document.getElementById("fechaEnvio");
const horaEnvio = document.getElementById("horaEnvio");


// Valores por defecto
const valoresPorDefecto = {
    lugar_envio: "...",
    lugar_destino: "...",
    folio: "...",
    costo: "...",
    fecha: "...",
    hora: "..."
  };

// Llenar los datos (puede venir del API o de valores por defecto)
function mostrarDatos(datos) {
  lugarEnvio.textContent = datos.lugar_envio;
  lugarDestino.textContent = datos.lugar_destino;
  datoFolio.textContent = datos.folio;
  costoEnvio.textContent = datos.costo;
  fechaEnvio.textContent = datos.fecha;
  horaEnvio.textContent = datos.hora;
}

// Intenta obtener los datos desde la API
fetchApi(`tracking/${folio}`)
  .then(respuesta => {
    const data = respuesta.body;
    const datos = {
      lugar_envio: data.paisOrigen || valoresPorDefecto.lugar_envio,
      lugar_destino: data.paisDestino || valoresPorDefecto.lugar_destino,
      folio: data.folio || valoresPorDefecto.folio,
      costo: data.costo ? `$${data.costo}` : valoresPorDefecto.costo,
      fecha: data.fecha || valoresPorDefecto.fecha,
      hora: data.hora || valoresPorDefecto.hora
    };
    console.log(data)
    mostrarDatos(datos);
  })
  .catch(error => {
    console.warn("Error al obtener los datos. Mostrando valores por defecto.", error);
    mostrarDatos(valoresPorDefecto);
  });

// Botón "Regresar"
document.getElementById("Regresar").addEventListener("click", () => {
  window.location.href = "historial.html";
});

// Botón "Rastrear Envío"
document.getElementById("Rastreo").addEventListener("click", () => {
  window.location.href = `rastreo.html?folio=${folio}`;
});