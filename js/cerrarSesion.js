function cerrarSesion() {
      swal({
            title: `Seguro que desea Cerrar Sesión`,
            icon: `warning`,
            buttons: {
                  cancel: "Cancelar",
                  Ok: true

            },
      })
            .then((value) => {
                  switch (value) {
                        case "Ok":
                              localStorage.clear();
                              window.location.replace('/index.html')
                              break;
                        default:
                              break;
                  }

            });
}