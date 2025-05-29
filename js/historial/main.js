const domTabla = document.querySelector('#tabla-envios');

fetchApi('tracking')
    .then(res => {
        let contenidoTabla = '';

        res.body.forEach(fila => {
            let estadoCorto = '';
            let estado = fila.status.toLowerCase().trim().replace(/\.$/, '');

            if (['paquete ha sido enviado', 'aduana completada'].includes(estado)) {
                estadoCorto = 'Enviado';
            } else if (estado == 'pedido registrado') {
                estadoCorto = 'Pendiente';
            } else if (estado == 'paquete entregado') {
                estadoCorto = 'Entregado';
            }

            contenidoTabla += `<tr><td>${fila.fecha}</td><td>${fila.folio}</td><td class="${estadoCorto.toLowerCase()}">${estadoCorto}</td><td>${fila.paisOrigen}</td><td>${fila.paisDestino}</td><td><a href="detalles.html?folio=${fila.folio}">Detalles</a></td></tr>`
        });

        domTabla.innerHTML = contenidoTabla;
    })
    .catch(error => {
        console.error('No fue posible cargar el historial', error);
    });