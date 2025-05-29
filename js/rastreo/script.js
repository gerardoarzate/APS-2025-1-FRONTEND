const steps = document.querySelectorAll('.item');
const statusText = document.querySelector('.status');
const statusDateText = document.querySelector('#fechaStatus');
const statusTimeText = document.querySelector('#horaStatus');
const trackingIdText = document.querySelector('#folio');
const stepTimeTexts = document.querySelectorAll('.time');
const url = new URL(location.href);
const trackingId = url.searchParams.get('folio');

function showData({ date, time, status }) {
  const { shortStatus, stepIndex } = getStatusData(status);
  const timeFormatted = time.replace(/:[^:]*$/, '');
  trackingIdText.textContent = trackingId;
  statusDateText.textContent = date;
  statusTimeText.textContent = timeFormatted;
  statusText.classList = `status ${shortStatus.toLowerCase()}`;
  statusText.textContent = shortStatus;

  stepTimeTexts.forEach(el => {
    const dateSplit = date.split(' ');
    el.innerHTML = `${dateSplit[1]} ${dateSplit[2]}<br>${timeFormatted}`
  });

  activateStep(stepIndex);
}

function activateStep(stepIndex) {
  const currentStep = steps[stepIndex];

  // Resetear estilos
  steps.forEach(s => {
    s.classList.remove('current', 'completed');
    s.querySelector('.circle').classList.remove('active');
  });

  // Activar paso actual y los anteriores
  for (let i = 0; i <= stepIndex; i++) {
    steps[i].classList.add('completed');
  }

  currentStep.classList.add('current');
  currentStep.querySelector('.circle').classList.add('active');
}

function getStatusData(longStatus) {
  const formatted = longStatus.toLowerCase().trim().replace(/\.$/, '');
  
  const data = {
    'pedido registrado': {
      shortStatus: 'Pendiente',
      stepIndex: 0
    },
    'paquete ha sido enviado': {
      shortStatus: 'Enviado',
      stepIndex: 1
    },
    'aduana completada': {
      shortStatus: 'Enviado',
      stepIndex: 2
    },
    'paquete entregado': {
      shortStatus: 'Entregado',
      stepIndex: 3
    }
  }

  return data[formatted];
}

async function changeStep(newStepIndex) {
  const statuses = [
    'Pedido registrado.',
    'Paquete ha sido enviado.',
    'Aduana completada.',
    'Paquete entregado.'
  ];

  const body = {
    estado: statuses[newStepIndex]
  }

  try {
    await fetchApi(`tracking/${trackingId}/status`, 'PUT', body);
    fetchCurrentStep();
  } catch (error) {
    alert('Ocurrió un error al cambiar el estado del producto.');
    console.error(error);
  }
}

async function fetchCurrentStep() {
  try {
    const res = await fetchApi(`/tracking/${trackingId}`);
    const data = res.body;
    showData({
      date: data.fecha,
      status: data.estatus,
      time: data.hora
    });
  } catch(error) {
    alert('No ha sido posible obtener los datos de rastreo');
    console.error(error);
  }

}

steps.forEach((step, index) => {
  step.querySelector('.circle').addEventListener('click', () => changeStep(index));
});

fetchCurrentStep();