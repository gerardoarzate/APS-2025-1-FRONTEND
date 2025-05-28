const domBtn = document.querySelector('#btnLogin');
const domInputEmail = document.querySelector('#email');
const domInputPass = document.querySelector('#password');

const clickLogin = () => {
    const email = domInputEmail.value;
    const pass = domInputPass.value;
    const body = {
        user: email,
        password: pass
    }

    fetchApi('authentication/Login', 'POST', body)
        .then(res => {
            if (res.error) {
                throw new Error('Datos incorrectos');
            }

            login(res.body);
        })
        .catch(error => {
            alert(`No ha sido posible iniciar sesión, revisa los datos y vuelve a intentarlo.`);
        });
}

domBtn.addEventListener('click', clickLogin);