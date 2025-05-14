const usuarioLogueado = Boolean(localStorage.getItem('token'));
const enPaginas = location.pathname.split('/')[1] == 'paginas';

if (usuarioLogueado && !enPaginas) {
    location.replace('/paginas/categorias.html');
} else if (!usuarioLogueado && enPaginas) {
    location.replace('/');
}