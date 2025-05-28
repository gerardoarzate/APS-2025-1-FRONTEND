const steps = document.querySelectorAll('.item');
const statusText = document.querySelector('.status');
const statusCard = document.querySelector('.status-card');
const statusDate = statusCard.querySelectorAll('p')[1];

const estados = [
  { texto: "Pendiente", clase: "pendiente" },
  { texto: "Enviado", clase: "enviado" },
  { texto: "Enviado", clase: "enviado" },
  { texto: "Entregado", clase: "entregado" }
];

steps.forEach((step, index) => {
  step.querySelector('.circle').addEventListener('click', () => {
    // Resetear estilos
    steps.forEach(s => {
      s.classList.remove('current');
      s.querySelector('.circle').classList.remove('active');
    });

    // Activar paso actual y los anteriores
    for (let i = 0; i <= index; i++) {
      steps[i].classList.add('completed');
    }

    step.classList.add('current');
    step.querySelector('.circle').classList.add('active');

    // Cambiar estado
    statusText.textContent = estados[index].texto;
    statusText.className = `status ${estados[index].clase}`;

    // Fecha de la burbuja
    const time = step.querySelector('.time').innerHTML.replace('<br>', ' ');
    statusDate.textContent = time;
  });
});
