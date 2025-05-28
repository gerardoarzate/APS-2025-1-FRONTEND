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
  let costoEnvio = getCosto(medioTransporte);
  
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

document.querySelector(".pdf").addEventListener("click", async () => {
  const ahora = new Date();
  const medioTransporte = steps[2].querySelector('select:nth-of-type(3)').value;
  const nombreCliente = steps[0].querySelector('input:nth-of-type(1)').value;
  const telefono = steps[0].querySelector('input:nth-of-type(2)').value;
  const correo = steps[0].querySelector('input:nth-of-type(3)').value;

  try {
    // Recopilar datos del formulario
    const datosProducto = {
      nombre: steps[1].querySelector('input[placeholder="Nombre del producto"]').value,
      peso: parseFloat(steps[1].querySelector('input[placeholder="Peso (kg)"]').value),
      altura: parseInt(steps[1].querySelector('input[placeholder="Altura (cm)"]').value),
      ancho: parseInt(steps[1].querySelector('input[placeholder="Ancho (cm)"]').value),
      id_categoria: getCategoriaId(steps[1].querySelector('#categoriaInput').value),
      pais_origen: getPaisId(steps[2].querySelector('select:nth-of-type(1)').value),
      pais_destino: getPaisId(steps[2].querySelector('select:nth-of-type(2)').value),
      id_medio_transporte: getMedioTransporteId(medioTransporte),
      fecha: ahora.toLocaleDateString().split('/').reverse().join('-'),
      hora: ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      costo: getCosto(medioTransporte),
      nombre_cliente: nombreCliente,
      telefono: telefono,
      correo: correo
    };

    console.log('Enviando datos:', datosProducto);

    // Enviar datos al backend
    const response = await fetch('http://localhost:777/api/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosProducto)
    });

    if (response.ok) {
      const resultado = await response.json();
      const folio = resultado?.result?.transactionId;
      alert(`Producto registrado exitosamente.\nFolio: ${folio}`);
      console.log('Respuesta del servidor:', resultado);

      const datosPDF = {
        nombre: datosProducto.nombre,
        peso: datosProducto.peso,
        altura: datosProducto.altura,
        ancho: datosProducto.ancho,
        categoria: steps[1].querySelector('#categoriaInput').value,
        pais_origen: steps[2].querySelector('select:nth-of-type(1)').selectedOptions[0].text,
        pais_destino: steps[2].querySelector('select:nth-of-type(2)').selectedOptions[0].text,
        medio_transporte: medioTransporte,
        fecha: datosProducto.fecha,
        hora: datosProducto.hora,
        costo: datosProducto.costo,
        nombre_cliente: nombreCliente,
        telefono: telefono,
        correo: correo,
        folio: folio
      };

      generarPDF(datosPDF);
      location.assign('/paginas/categorias.html');
    } else {
      throw new Error(`Error del servidor: ${response.status}`);
    }

  } catch (error) {
    console.error('Error al enviar datos:', error);
    alert("Error al registrar el producto. Por favor intente nuevamente.");
  }
});

// Funciones auxiliares para convertir valores a IDs
function getCategoriaId(categoria) {
  const categorias = {
    'Alimentos': 1,
    'Electrónicos': 2,
    'Vehículos': 3
  };
  return categorias[categoria] || 1;
}

function getMedioTransporteId(medio) {
  const medios = {
    'Aéreo': 1,
    'Terrestre': 2,
    'Maritimo': 3
  };
  return medios[medio] || 1;
}

function getPaisId(pais) {
  const paises = {
    'Estados Unidos': 1,
    'China': 2,
    'Canadá': 3,
    'Alemania': 4,
    'Japón': 5,
    'Corea del Sur': 6,
    'Brasil': 7,
    'Guatemala': 8,
    'Reino Unido': 9,
    'Colombia': 10,
    'España': 11,
    'Francia': 12,
    'Italia': 13,
    'México': 14
  };
  return paises[pais] || 1;
}

function getCosto(medioTransporte) {
  switch(medioTransporte) {
  case "Aéreo":
    return 500;
  case "Maritimo":
    return 200;
  case "Terrestre":
    return 300;
  default:
    return 250; // Costo por defecto
  }
}

window.addEventListener("DOMContentLoaded", () => {
  showStep(currentStep);
});