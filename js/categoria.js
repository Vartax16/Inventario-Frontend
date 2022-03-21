switch (user) {
      case user = null:
            window.location.replace('/index.html')
            break;
      default:
            var Id = 0;
            security()

            function get() {
                  axios.get(`${url}/Categorias/GetAll`, {
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
                                                      { data: 'categoria' },
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

                                          $('#table tbody').on('click', 'a', function () {
                                                var action = this.id;
                                                var data = table.row($(this).parents('tr')).data();

                                                if (action == 'update') {
                                                      document.getElementById('addCate').innerHTML = "Editar Categoría"
                                                      document.getElementById('Titulo').innerHTML = "Editar Categoría"
                                                      $("#myModal").modal();
                                                      Id = data.id
                                                      document.getElementById('Categoria').value = data.categoria
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

                              if (error.response) {
                                    swal({
                                          title: "Error de Connection",
                                          text: "Contactarse con Mesa de Ayuda",
                                          icon: "error",
                                    });
                              }
                        });
            }

            function limpiar() {
                  document.getElementById('addCate').innerHTML = "Agregar Categoría"
                  document.getElementById('Titulo').innerHTML = "Agregar Categoría"
                  document.getElementById("Categoria").value = ''
                  Id = ''
            }

            function addCategory() {
                  var Categoria = document.getElementById("Categoria").value;
                  if (Categoria == '') {
                        swal({
                              title: "Campos Obligatorios",
                              icon: "warning",
                        });

                  } else {
                        switch (Id, true) {
                              case Id == null || Id == 0:

                                    axios.post(`${url}/Categorias/Post`, {
                                          Categoria: Categoria,
                                          Fecha: new Date(),
                                    }).then(function (response) {
                                          limpiar()
                                          $("#myModal").modal('hide');
                                          refreshTable('table', `${url}/Categorias/GetAll`)

                                          swal({
                                                title: "Categoría Guardada",
                                                icon: "success",
                                                buttons: false,
                                                timer: 2000
                                          });
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
                              default:
                                    axios.put(`${url}/Categorias/Put/${Id}`, {
                                          ID: Id,
                                          Categoria: Categoria,
                                          Fecha: new Date(),
                                    }).then(function (response) {
                                          limpiar()
                                          $("#myModal").modal('hide');
                                          refreshTable('table', `${url}/Categorias/GetAll`)

                                          swal({
                                                title: "Categoría Guardada",
                                                icon: "success",
                                                buttons: false,
                                                timer: 2000
                                          });
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

            function add() {
                  $("#myModal").modal();
                  document.getElementById('addCate').innerHTML = "Agregar Categoría"
                  document.getElementById('Titulo').innerHTML = "Agregar Categoría"
            }

            function deleteCategory() {
                  axios.delete(`${url}/Categorias/Delete/${Id}`, {
                        responseType: 'json'
                  })
                        .then(function (res) {
                              limpiar()
                              $("#ModalDelete").modal('hide');
                              refreshTable('table', `${url}/Categorias/GetAll`)
                              swal({
                                    title: "Categoría Eliminada Correctamente",
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