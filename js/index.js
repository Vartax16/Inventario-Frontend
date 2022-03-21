switch (user) {
    default:
        axios.get(`${url}/Usuarios/GetUser/${localStorage.getItem('User')}`, {
        })
            .then(function (res) {
                if (res.status == 200) {
                    redirection(res.data, localStorage.getItem('User'))
                }
            })
        break;
    case user = null:

        /* Funcion iniciar Sesion */
        function login() {
            var Usuario = document.getElementById('Usuario').value;
            var Clave = document.getElementById('Clave').value;

            /* Request */
            axios.get(`${url}/Usuarios/GetLogeo/${Usuario}/${Clave}`, {
                responseType: 'json'
            })
                .then(function (res) {
                    axios.get(`${url}/Usuarios/GetUser/${Usuario}`, {
                    })
                        .then(function (data) {
                            redirection(data.data, Usuario)
                        })
                })
                .catch(function (error) {
                    if (error.response) {
                        swal({
                            title: `El Usuario o Contraseña son incorrectos`,
                            icon: "error"
                        })
                    }
                });
        }

        function redirection(data, Usuario) {
            debugger
            switch (data, true) {
                case data == 'Administrador':
                    /* Crear metodo para mantenerse logeado */
                    localStorage.setItem("User", Usuario);
                    window.location.replace("/view/usuarios.html");
                    break;
                case data == 'Auxiliar':
                    /* Crear metodo para mantenerse logeado */
                    localStorage.setItem("User", Usuario);
                    window.location.replace("/view/ventas.html");
                    break;
            }
        }

        document.getElementById("Clave").addEventListener("keyup", function (event) {
            // Number 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13) {
                // Cancel the default action, if needed
                event.preventDefault();
                // Trigger the button element with a click
                login()
            }
        });
        document.getElementById("Usuario").addEventListener("keyup", function (event) {
            // Number 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13) {
                // Cancel the default action, if needed
                event.preventDefault();
                // Trigger the button element with a click
                login()
            }
        });

        break;
}