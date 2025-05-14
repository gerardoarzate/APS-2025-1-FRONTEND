const login = token => {
    localStorage.setItem('token', token);
    location.replace('/paginas/categorias.html');
}