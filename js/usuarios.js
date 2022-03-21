switch (user) {
      case user = null:
            window.location.replace('/index.html')
            break;
      default:
            //Id para Edición Código
            var Id = 0;
            var State = document.getElementById('State')
            securityA()

            function get() {
                  //Request Get Datatable
                  axios.get(`${url}/Usuarios/GetAll`, {
                        responseType: 'json'
                  })
                        .then(function (res) {
                              if (res.status == 200) {
                                    $(document).ready(function () {
                                          var table = $('#table').DataTable({

                                                //Agregando datos recibidos a aray data
                                                data: res.data,


                                                //Columnas de las tablas
                                                columns: [
                                                      { data: 'id' },
                                                      { data: 'nombre' },
                                                      { data: 'usuario' },
                                                      { data: 'perfil' },
                                                      { data: 'estado' },
                                                      { data: 'ultimoLogin' },
                                                      {
                                                            data: null,
                                                            className: "center",
                                                            defaultContent: "<div style=\"text-align: center;color: #F2AA1F;\"><a data-toggle=\"tooltip\" title=\"Editar\"  data-placement=\"top\" id=\"update\" > <i class=\"bi bi-pencil-square\" ></i></a><a data-toggle=\"tooltip\" title=\"Eliminar\"  data-placement=\"top\" id=\"delete\" > <i class=\"bi bi-trash3\"></i></a></div>"
                                                      },
                                                ],

                                                aLengthMenu: [[10, 25, 50, 100], ["10", "25", "50", "100"]],

                                                //Cambiando el Lenguaje por defecto a Español
                                                language: {
                                                      "sProcessing": "Procesando...",
                                                      "sLengthMenu": "Mostrar registros _MENU_ ",
                                                      "sZeroRecords": "No se encontraron resultados",
                                                      "sEmptyTable": "Ningún dato disponible en esta tabla",
                                                      "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                                                      "sInfoEmpty": "",
                                                      "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                                                      "sInfoPostFix": "",
                                                      "sSearch": "<i class=\"bi bi-search\" style=\"color: #F2AA1F;\"></i>",
                                                      "sUrl": "",
                                                      "sInfoThousands": ",",
                                                      "sLoadingRecords": "Cargando...",
                                                      "oPaginate": {
                                                            "sFirst": "Primero",
                                                            "sLast": "Último",
                                                            "sNext": " <button type=\"button\"class=\"button\">Siguiente</button>",
                                                            "sPrevious": "<button type=\"button\"class=\"datatableButton\"><i class=\"bi bi-arrow-left\"></i></button> "
                                                      },
                                                      "oAria": {
                                                            "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                                                            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                                                      }
                                                }
                                          })

                                          // Al hace click en la fila
                                          $('#table tbody').on('click', 'tr', function () {
                                                var data = table.row(this).data();
                                                document.getElementById("Nombre1").value = data.nombre
                                                document.getElementById("Usuario1").value = data.usuario
                                                document.getElementById("Perfil1").value = data.perfil
                                                document.getElementById("Estado1").value = data.estado
                                                $('#Perfil1').selectpicker('refresh');
                                                $('#Estado1').selectpicker('refresh');
                                                axios.get(`${url}/Usuarios/GetPhoto/${data.id}`, {
                                                      responseType: 'json'
                                                })
                                                      .then(function (res) {
                                                            document.getElementById('output1').src = `${res.data.foto}`
                                                      })
                                                $("#visualization").modal();
                                                e.stopPropagation()

                                          });

                                          $('#table tbody').on('click', 'a', function () {
                                                var action = this.id;
                                                var data = table.row($(this).parents('tr')).data();

                                                if (action == 'update') {
                                                      Id = data.id
                                                      document.getElementById('addCate').innerHTML = "Editar Usuario"
                                                      document.getElementById('Titulo').innerHTML = "Editar Usuario"
                                                      document.getElementById("Nombre").value = data.nombre
                                                      document.getElementById("Usuario").value = data.usuario
                                                      document.getElementById("Perfil").value = data.perfil
                                                      document.getElementById("Estado").value = data.estado
                                                      $('#Perfil').selectpicker('refresh');
                                                      $('#Estado').selectpicker('refresh');
                                                      State.hidden = false

                                                      axios.get(`${url}/Usuarios/GetPhoto/${data.id}`, {
                                                            responseType: 'json'
                                                      })
                                                            .then(function (res) {
                                                                  document.getElementById('output').src = `${res.data.foto}`
                                                            })
                                                            .catch(function (error) {
                                                                  document.getElementById('output').src = '/icons/nav/foto.jpg'
                                                            });
                                                      $("#myModal").modal();
                                                      e.stopPropagation()
                                                }

                                                else if (action == 'delete') {
                                                      $("#ModalDelete").modal();
                                                      Id = data.id
                                                      e.stopPropagation()
                                                }
                                          });
                                    });

                              }
                        })
                        .catch(function (error) {

                              //En caso de Error
                              if (error.response) {
                                    swal({
                                          title: "Error de Connection",
                                          text: "Contactarse con Mesa de Ayuda",
                                          icon: "error",
                                    });
                              }
                        });
            }

            function Img(Photo) {
                  const canvas = document.createElement('canvas');
                  const ctx = canvas.getContext('2d');
                  // Set width and height
                  canvas.width = Photo.naturalWidth;
                  canvas.height = Photo.naturalHeight;
                  // Draw the photo
                  ctx.drawImage(Photo, 0, 0);
                  var dataURL = canvas.toDataURL("photo/jpg");
                  Photo = dataURL.replace(/^data:photo\/(png|jpg);base64,/, "")
                  return Photo
            }

            function limpiar() {
                  document.getElementById('addCate').innerHTML = "Agregar Usuario"
                  document.getElementById('Titulo').innerHTML = "Agregar Usuario"
                  document.getElementById("Nombre").value = ''
                  document.getElementById("Usuario").value = ''
                  document.getElementById("Clave").value = ''
                  document.getElementById("Perfil").value = ''
                  Id = 0
                  document.getElementById('output').src = '/icons/nav/foto.jpg'
            }

            function addUser() {
                  swal({
                        title: "Espere",
                        icon: "warning",
                        buttons: false
                  });

                  Foto = new Image()
                  Foto = document.getElementById('output');

                  //Recuerda Siempre cambiar el Src
                  if (Foto.src == `${window.location.origin}/icons/nav/foto.jpg`) {
                        Foto = ""
                  } else {
                        Foto = Img(Foto)
                  }
                  //Valores de los Inputs
                  var Nombre = document.getElementById("Nombre").value;
                  var Usuario = document.getElementById("Usuario").value;
                  var Clave = document.getElementById("Clave").value;
                  var Perfil = document.getElementById("Perfil").value;


                  if (Nombre == '' || Usuario == '' || Clave == "" || Perfil == '') {
                        //Alerta de Guardar
                        swal({
                              title: "Campos Obligatorios",
                              icon: "warning",
                        });

                  } else {
                        /* Crear Usuario */
                        switch (Id, true) {
                              case Id == null || Id == 0:
                                    axios.get(`${url}/Usuarios/ConfirmUser/${document.getElementById('Usuario').value}`, {
                                    }).then(function (response) {
                                          swal({
                                                title: "Este Usuario ya existe",
                                                icon: "warning",
                                          });
                                    }).catch(function (error) {
                                          axios.post(`${url}/Usuarios/PostUsuarios`, {
                                                Nombre: Nombre,
                                                Usuario: Usuario,
                                                Clave: Clave,
                                                Perfil: Perfil,
                                                Foto: Foto,
                                                Estado: 'Activo',
                                                UltimoLogin: new Date(),
                                                Fecha: new Date(),
                                          }).then(function (response) {
                                                $("#myModal").modal('hide');
                                                refreshTable('table', `${url}/Usuarios/GetAll`)

                                                //Alerta de Guardar
                                                swal({
                                                      title: "Usuario Guardado",
                                                      icon: "success",
                                                      buttons: false,
                                                      timer: 2000
                                                });
                                                limpiar()
                                          }).catch(function (error) {
                                                if (error.response) {
                                                      swal({
                                                            title: "Error de Connection",
                                                            text: "Contactarse con Mesa de Ayuda",
                                                            icon: "error",
                                                      });
                                                }
                                          })
                                    });
                                    break;

                              default:
                                    axios.put(`${url}/Usuarios/Put/${Id}`, {
                                          ID: Id,
                                          Nombre: Nombre,
                                          Usuario: Usuario,
                                          Clave: Clave,
                                          Perfil: Perfil,
                                          Foto: Foto,
                                          Estado: document.getElementById('Estado').value,
                                          UltimoLogin: new Date(),
                                          Fecha: new Date(),
                                    }).then(function (response) {
                                          $("#myModal").modal('hide');
                                          refreshTable('table', `${url}/Usuarios/GetAll`)

                                          //Alerta de Guardar
                                          swal({
                                                title: "Usuario Guardado",
                                                icon: "success",
                                                buttons: false,
                                                timer: 2000
                                          });
                                          limpiar()
                                    }).catch(function (error) {
                                          if (error.response) {
                                                swal({
                                                      title: "Error de Connection",
                                                      text: "Contactarse con Mesa de Ayuda",
                                                      icon: "error",
                                                });
                                          }
                                    });
                                    break;
                        }
                  }
            }

            function refreshTable(tableId, urlData) {
                  $.getJSON(urlData, null, function (json) {
                        table = $(tableId).dataTable();
                        oSettings = table.fnSettings();

                        table.fnClearTable(this);

                        for (var i = 0; i < json.length; i++) {
                              table.oApi._fnAddData(oSettings, json[i]);
                        }

                        oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
                        table.fnDraw();
                  });
            }

            var loadFile = function (event) {
                  var image = document.getElementById('output');
                  image.src = URL.createObjectURL(event.target.files[0]);
            };

            function deletePhoto() {
                  document.getElementById('output').src = "/icons/nav/foto.jpg"
            }

            function add() {
                  limpiar()
                  $("#myModal").modal();
                  document.getElementById('addCate').innerHTML = "Agregar Usuario"
                  document.getElementById('Titulo').innerHTML = "Agregar Usuario"
                  State.hidden = true
            }

            function deleteCategory() {
                  axios.delete(`${url}/Usuarios/Delete/${Id}`, {
                        responseType: 'json'
                  })
                        .then(function (res) {
                              limpiar()
                              $("#ModalDelete").modal('hide');
                              refreshTable('table', `${url}/Usuarios/GetAll`)
                              swal({
                                    title: "Usuario Eliminado Correctamente",
                                    icon: "success",
                                    buttons: false,
                                    timer: 2000
                              });
                        })
                        .catch(function (error) {

                              if (error.response) {
                                    swal({
                                          title: "Error de Connection",
                                          text: "Contactarse con Mesa de Ayuda",
                                          icon: "error",
                                    });
                              }
                        });
            }

            break;
} 