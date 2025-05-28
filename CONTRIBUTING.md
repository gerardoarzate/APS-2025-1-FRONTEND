# Contribuyendo en el proyecto final de Administración de Proyectos de Software - Frontend Web

## Flujo de trabajo

1. Crea un fork de este repositorio
2. Clona tu fork localmente
3. Realiza los cambios correspondientes a tu asignación
4. Haz commit de los cambios en tu repositorio local
5. Envía los cambios a tu fork en GitHub usando `git push`
6. Abre una Pull Request hacía el repositorio original del profesor
7. Tus cambios serán revisados y se aceptará tu Pull Request

## Estructura del proyecto

El directorio del proyecto se encuentra formado de la siguiente manera:

`/assets`
Contiene imágenes, íconos y demás archivos que serán utilizados dentro de las páginas.

`/css`
Contiene las hojas de estilo. Al crear una nueva página se debe crear su archivo .css correspondiente en esta carpeta.

`/js`
Contiene los códigos de JavaScript. Al crear una nueva página se debe crear una carpeta que contendrá todos los scripts relacionados a ella. Los scripts que se encuentran fuera de una carpeta son de uso general.

`/paginas`
Contiene todas las páginas que forman el sitio. Al crear una nueva página se debe crear un archivo .html en esta carpeta y pegar dentro de él la plantilla para nuevas páginas. No olvidar importar su hoja de estilos y los scripts correspondientes.

`index.html`
El índice del sitio, es la página de inicio de sesión.

## Scripts de uso general

Dentro de `/js` se encuentran algunos scripts de uso general que ya han sido incluídos en la plantilla para nuevas páginas.

`comprobarSesion.js`<br>
Este script revisa si el usuario cuenta con una sesión activa y redirige al usuario en caso de ser necesario.

`fetchApi.js`<br>
Este script declara la función fetchApi. Esta función utiliza fetch para hacer una petición HTTP a la API, simplificando el proceso ya que incluye automáticamente el token de autorización y requiere solo pasar como argumento el endpoint de la API, sin incluir el hostname ni "/api/".

`login.js`<br>
Recibe el token de autorización como argumento, lo almacena en localStorage y redirecciona al usuario.

`logout.js`<br>
Remueve el token de autorización del localStorage y redirecciona al usuario de vuelta al login.

`sidebar.js`<br>
Se encarga de crear la sidebar dentro del componente con clase "sidebar" incluido en la plantilla para nuevas páginas.

## Creando nuevas páginas

Para crear una nueva página, crear un nuevo archivo HTML dentro de la carpeta `/paginas`, un archivo CSS dentro de la carpeta `/css` y una carpeta dentro de la carpeta `/js`. Estos archivos y carpetas deberán tener el mismo nombre.

Se deberá copiar y pegar esta plantilla dentro del archivo HTML recién creado. No olvidar importar tambien su hoja de estilos CSS y los scripts que vayas a crear.

Todo el contenido de la página deberá ir dentro de la etiqueta `<main class="contenido">`.

### Plantilla para nuevas páginas

    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nueva página</title>

        <!-- Importar estilos -->
        <link rel="stylesheet" href="../css/global.css">
        
    </head>
    <body>

        <aside class="sidebar"></aside>

        <main class="contenido">
            <p>El contenido de la página va aquí</p>
        </main>

        <!-- Importar código -->
        <script src="../js/comprobarSesion.js"></script>
        <script src="../js/fetchApi.js"></script>
        <script src="../js/logout.js"></script>
        <script src="../js/sidebar.js"></script>
    </body>
    </html>

## Aspectos a tener en cuenta

Apegarse al diseño del Figma.

Utilizar Media Queries de CSS para que la página sea responsiva.

Usar los colores de la paleta de colores, declarados en variables de CSS dentro de `/css/global.css`.

Revisar la página de Transición en Figma para verificar el flujo de navegación.

Seguir buenas prácticas de programación y escribir código limpio y legible.


## Conectando el frontend con la API

Para consumir la API desde el frontend, deberá utilizarse la función `fetchApi`. Para mas detalles sobre la función, ver el comentario del archivo `/js/fetchApi.js`.

Es importante tomar en cuenta que `fetchApi` es una función asíncrona que utiliza el sistema de promesas de JavaScript.

Ejemplo de uso:

    fetchApi('/ejemplo')
        .then(respuesta => {
            console.log(respuesta.mensaje);
        })
        .catch(error => {
            console.log(`Ocurrió un error: ${error.message}`);
        })