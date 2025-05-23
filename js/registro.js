const steps = document.querySelectorAll("section.card");
let currentStep = 0;

const categoriaInput = document.getElementById("categoriaInput");

// Leer categoría desde la URL
const params = new URLSearchParams(window.location.search);
const categoria = params.get("categoria");

// Si viene categoría por URL, seleccionarla automáticamente
if (categoria && categoriaInput) {
  // Capitalizar la primera letra para que coincida con las opciones
  const categoriaCapitalizada = categoria.charAt(0).toUpperCase() + categoria.slice(1);
  categoriaInput.value = categoriaCapitalizada;
}

// Event listener para cambiar la URL cuando se selecciona una categoría
if (categoriaInput) {
  categoriaInput.addEventListener("change", function() {
    const categoriaSeleccionada = this.value;
    
    if (categoriaSeleccionada) {
      const urlBase = window.location.origin + window.location.pathname;
      const nuevaUrl = `${urlBase}?categoria=${categoriaSeleccionada.toLowerCase()}`;
      window.history.pushState({}, '', nuevaUrl);
    } else {
      const urlSinParametros = window.location.origin + window.location.pathname;
      window.history.pushState({}, '', urlSinParametros);
    }
  });
}

function showStep(index) {
  steps.forEach((step, i) => step.classList.toggle("hidden", i !== index));
}

function validateStep(stepElement) {
  const inputs = stepElement.querySelectorAll("input, select");
  let isValid = true;

  inputs.forEach(input => {
    input.classList.remove("invalid");
    if (!input.value.trim()) {
      input.classList.add("invalid");
      isValid = false;
    }
  });

  return isValid;
}

function mostrarResumen() {
  // Paso 3: Datos del envío
  const lugarEnvio = steps[2].querySelectorAll("select")[0].value;
  const lugarDestino = steps[2].querySelectorAll("select")[1].value;
  const medioTransporte = steps[2].querySelectorAll("select")[2].value;

  // Mostrar datos en los elementos individuales
  document.getElementById("datoEnvio").textContent = lugarEnvio;
  document.getElementById("datoDestino").textContent = lugarDestino;
  document.getElementById("datoMedio").textContent = medioTransporte;

  // Fecha y hora
  const ahora = new Date();
  const fecha = ahora.toLocaleDateString();
  const hora = ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  document.getElementById("fechaEnvio").textContent = fecha;
  document.getElementById("horaEnvio").textContent = hora;

  // Costo variable según el medio de transporte
  let costoEnvio = 0;
  switch(medioTransporte) {
    case "Aéreo":
      costoEnvio = 500;
      break;
    case "Maritimo":
      costoEnvio = 200;
      break;
    case "Terrestre":
      costoEnvio = 300;
      break;
    default:
      costoEnvio = 250; // Costo por defecto
  }
  
  document.getElementById("costoEnvio").textContent = `${costoEnvio}`;
}

document.querySelectorAll(".next").forEach(btn => {
  btn.addEventListener("click", () => {
    if (validateStep(steps[currentStep])) {
      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
        if (currentStep === 3) mostrarResumen();
      }
    } else {
      alert("Por favor complete todos los campos.");
    }
  });
});

document.querySelectorAll(".prev").forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });
});

document.querySelector(".pdf").addEventListener("click", () => {
  alert("Simulando envío de datos y descarga de PDF...");
  // Aquí se haría la llamada real a la API en producción
});

window.addEventListener("DOMContentLoaded", () => {
  showStep(currentStep);
});