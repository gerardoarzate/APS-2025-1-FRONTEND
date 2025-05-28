const crearSidebar = () => {
    const domContenedorSidebar = document.querySelector('.sidebar');
    
    const domSidebarLateral = document.createElement('div');
    domSidebarLateral.classList.add('sidebar__lateral')

    const domContenedorSuperior = document.createElement('div');
    domContenedorSuperior.classList.add('sidebar__lateral__contenedorSuperior');

    const domContenedorLogo = document.createElement('div');
    domContenedorLogo.classList.add('sidebar__lateral__contenedorLogo');
    
    const domLogo = document.createElement('img');
    domLogo.src = '../assets/logo.png';
    domLogo.classList.add('sidebar__lateral__contenedorLogo__logo');
    
    domContenedorLogo.append(domLogo);
    
    const domContenedorOpciones = document.createElement('div');
    domContenedorOpciones.classList.add('sidebar__lateral__opciones');
    
    const opciones = [
        {
            href: 'categorias.html',
            texto: 'Registro del producto',
            icono: 'registro.png',
            paginasIncluidas: ['registrar-producto.html']
        },
        {
            href: 'historial.html',
            texto: 'Historial de envíos',
            icono: 'rastreo.png',
            paginasIncluidas: ['detalles.html', 'rastreo.html']
        },
        {
            href: 'cotizacion.html',
            texto: 'Cotización',
            icono: 'cotizacion.png',
        }
    ];
    
    for (const opcion of opciones) {
        const { href, texto, icono, paginasIncluidas } = opcion;
        const todasLasPaginasIncluidas = paginasIncluidas ? [...paginasIncluidas, href] : [href];
        const paginaActual = location.pathname.split('/')[2];
    
        const domOpcion = document.createElement('a');
        domOpcion.href = href;
        domOpcion.classList.add('sidebar__lateral__opciones__opcion');
        if (todasLasPaginasIncluidas.includes(paginaActual)) {
            domOpcion.classList.add('seleccionada');
        }
    
        const domOpcionIcono = document.createElement('img');
        domOpcionIcono.classList.add('sidebar__lateral__opciones__opcion__icono');
        domOpcionIcono.src = `../assets/${icono}`;
    
        const domOpcionTexto = document.createElement('p');
        domOpcionTexto.append(texto);
        domOpcionTexto.classList.add('sidebar__lateral__opciones__opcion__texto');
        
        domOpcion.append(domOpcionIcono, domOpcionTexto);
        domContenedorOpciones.append(domOpcion);
    }

    domContenedorSuperior.append(domContenedorLogo, domContenedorOpciones)

    const domOpcionCerrarSesion = document.createElement('a');
    domOpcionCerrarSesion.classList.add('sidebar__lateral__opciones__opcion');
    domOpcionCerrarSesion.onclick = logout;
    
    const domOpcionCerrarSesionIcono = document.createElement('img');
    domOpcionCerrarSesionIcono.classList.add('sidebar__lateral__opciones__opcion__icono');
    domOpcionCerrarSesionIcono.src = `../assets/cerrar-sesion.png`;

    const domOpcionCerrarSesionTexto = document.createElement('p');
    domOpcionCerrarSesionTexto.append('Cerrar sesión');
    domOpcionCerrarSesionTexto.classList.add('sidebar__lateral__opciones__opcion__texto');
    
    domOpcionCerrarSesion.append(domOpcionCerrarSesionIcono, domOpcionCerrarSesionTexto);

    domSidebarLateral.append(domContenedorSuperior, domOpcionCerrarSesion);

    const domSidebarMovil = document.createElement('div');
    domSidebarMovil.classList.add('sidebar__movil');
    
    const domLogoMovil = document.createElement('img');
    domLogoMovil.src = '../assets/logo.png';
    domLogoMovil.classList.add('sidebar__movil__logo');

    const domIconoMenu = document.createElement('img');
    domIconoMenu.src = '../assets/menu.png';
    domIconoMenu.classList.add('sidebar__movil__iconoMenu');

    const domFondoOscuro = document.createElement('div');
    domFondoOscuro.classList.add('sidebar__fondoOscuro');

    domSidebarMovil.append(domLogoMovil, domIconoMenu);

    domContenedorSidebar.append(domSidebarLateral, domSidebarMovil, domFondoOscuro);

    const mostrarSidebar = () => {
        domSidebarLateral.classList.add('visible');
        domFondoOscuro.classList.add('visible');
    }

    const ocultarSidebar = () => {
        domSidebarLateral.classList.remove('visible');
        domFondoOscuro.classList.remove('visible');
    }

    domIconoMenu.addEventListener('click', mostrarSidebar);
    domFondoOscuro.addEventListener('click', ocultarSidebar);
    window.addEventListener('resize', ocultarSidebar);
}    

crearSidebar();
