const apiUrl = 'http://127.0.0.1:3000';
const storedAuthToken = localStorage.getItem('token');

/**
 * Función que utiliza fetch para hacer una petición HTTP a la API. Incluye el
 * token de autorización si existe y convierte la respuesta en un objeto de
 * JavaScript si es un JSON o texto plano en caso contrario.
 * @param {string} path El endpoint hacia el cual se hará la solicitud, excluyendo el hostname.
 * @param {string} [method] Método HTTP (opcional, por defecto GET).
 * @param {object} [body] Cuerpo de la solicitud como un objeto de JavaScript (opcional).
 * @param {object} options Opciones para la función fetch (opcional).
 * @returns La respuesta como objeto de JavaScript o texto plano.
 */
const fetchApi = async (path, method = 'GET', body, options = {}) => {
    if (!apiUrl) {
        throw new Error("Can't use fetchApi because apiUrl is not defined");
    }

    const cleanPath = path.replace(/^\//, '');

    const headers = {
        'Content-Type': 'application/json'
    };

    if (storedAuthToken) {
        headers['Authorization'] = `Bearer ${storedAuthToken}`;
    }

    const completeOptions = { 
        ...options,
        method: method.toUpperCase(),
        headers
    };
    
    if (body) {
        completeOptions['body'] = JSON.stringify(body);
    }

    const res = await fetch(`${apiUrl}/${cleanPath}`, completeOptions);

    if (res.ok) {
        const text = await res.text();
        try {
            return JSON.parse(text);
        } catch(error) {
            return text;
        }
    }

    throw new Error(`Unsuccessful request: ${res.status} ${res.statusText}`);
}