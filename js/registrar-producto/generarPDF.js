function generarPDF(datos) {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Encabezado
    doc.setFontSize(16);
    doc.text(`Folio: ${datos.folio}`, 10, 10);
    doc.setFontSize(12);
    doc.text('Resumen del Envío', 10, 20);
    doc.line(10, 22, 200, 22);

    // Datos del producto
    const producto = [
      ['Nombre del producto', datos.nombre],
      ['Peso (kg)', datos.peso.toString()],
      ['Altura (cm)', datos.altura.toString()],
      ['Ancho (cm)', datos.ancho.toString()],
      ['Categoría', datos.categoria],
      ['Medio de transporte', datos.medio_transporte],
      ['País de origen', datos.pais_origen],
      ['País de destino', datos.pais_destino],
      ['Fecha', datos.fecha],
      ['Hora', datos.hora],
      ['Costo ($)', `$${datos.costo}`]
    ];

    // Datos del cliente
    const cliente = [
      ['Nombre del cliente', datos.nombre_cliente],
      ['Teléfono', datos.telefono],
      ['Correo', datos.correo]
    ];

    // Función para imprimir secciones
    let y = 30;
    const printSection = (title, rows) => {
      doc.setFontSize(14);
      doc.text(title, 10, y);
      y += 6;
      doc.setFontSize(11);
      rows.forEach(([label, value]) => {
        doc.text(`${label}:`, 10, y);
        doc.text(value, 70, y);
        y += 6;
      });
      y += 4;
    };

    printSection('Datos del Producto', producto);
    printSection('Datos del Cliente', cliente);

    doc.save(`${datos.folio}.pdf`);
  } catch (error) {
    console.error('No fue posible generar el PDF', error);
  }
}
