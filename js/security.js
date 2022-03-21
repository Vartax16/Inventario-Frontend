function security() {
      axios.get(url + '/Usuarios/GetUser/' + localStorage.getItem('User'), {
      })
            .then(function (res) {
                  if (res.status == 200) {
                        switch (res.data) {
                              case 'Auxiliar':
                              case 'Administrador':
                                    get()
                                    axios.get(url + '/Usuarios/GetPhotoUser/' + localStorage.getItem('User'), {
                                    })
                                          .then(function (res) {
                                                document.getElementById('fotoUser').src = `${res.data.foto}`
                                                document.getElementById('UserButton').innerHTML = localStorage.getItem('User')
                                          })
                                    break;
                              default:
                                    swal({
                                          title: "NO POSEE PERMISO DE ADMINISTRADOR",
                                          text: "Comuniquese con el Administrador",
                                          icon: "error",
                                          buttons: {
                                                Ok: true

                                          },
                                    })
                                          .then((value) => {
                                                switch (value) {
                                                      case "Ok":
                                                            window.location.replace('/index.html')
                                                            break;
                                                      default:
                                                            window.location.replace('/index.html')
                                                            break;
                                                }

                                          });
                                    break;
                        }
                  }
            })
}

function securityA() {
      axios.get(url + '/Usuarios/GetUser/' + localStorage.getItem('User'), {
      })
            .then(function (res) {
                  if (res.status == 200) {
                        switch (res.data) {
                              case 'Administrador':
                                    get()
                                    axios.get(url + '/Usuarios/GetPhotoUser/' + localStorage.getItem('User'), {
                                    })
                                          .then(function (res) {
                                                document.getElementById('fotoUser').src = `${res.data.foto}`
                                                document.getElementById('UserButton').innerHTML = localStorage.getItem('User')
                                          })
                                    break;
                              default:
                                    swal({
                                          title: "NO POSEE PERMISO DE ADMINISTRADOR",
                                          text: "Comuniquese con el Administrador",
                                          icon: "error",
                                          buttons: {
                                                Ok: true

                                          },
                                    })
                                          .then((value) => {
                                                switch (value) {
                                                      case "Ok":
                                                            window.location.replace('/index.html')
                                                            break;
                                                      default:
                                                            window.location.replace('/index.html')
                                                            break;
                                                }

                                          });
                                    break;
                        }
                  }
            })
}