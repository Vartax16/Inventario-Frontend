switch (user) {
      case user = null:
            window.location.replace('/index.html')
            break;
      default:
            //security()

            //Id para Edición Código
            var Id = 0;
            var Stock = ""
            var Venta = ""
            securityA()
            Categorias()
            Proveedores()
            
            function get() {
                  //Request Get Datatable
                  axios.get(`${url}/Productos/GetAll`, {
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
                                                      { data: 'proveedorID' },
                                                      { data: 'codigo' },
                                                      { data: 'descripcion' },
                                                      { data: 'categoriaID' },
                                                      { data: 'stock' },
                                                      { data: 'precioVenta' },
                                                      { data: 'precioCompra' },
                                                      { data: 'fecha' },
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
                                          $('#table tbody').on('click', 'a', function () {
                                                var action = this.id;
                                                var data = table.row($(this).parents('tr')).data();

                                                if (action == 'update') {
                                                      document.getElementById('addCate').innerHTML = "Editar Producto"
                                                      document.getElementById('Titulo').innerHTML = "Editar Producto"
                                                      Id = data.id
                                                      document.getElementById('ProveedorID').value = data.proveedorID1
                                                      document.getElementById('CategoriaID').value = data.categoriaID2
                                                      document.getElementById('Codigo').value = data.codigo
                                                      document.getElementById('PrecioCompra').value = data.precioCompra
                                                      document.getElementById('Descripcion').value = data.descripcion
                                                      document.getElementById('PrecioVenta').value = data.precioVenta
                                                      Stock = data.stock
                                                      Venta = data.venta
                                                      $('#ProveedorID').selectpicker('refresh');
                                                      $('#CategoriaID').selectpicker('refresh');

                                                      axios.get(`${url}/Productos/GetPhoto/${data.id}`, {
                                                            responseType: 'json'
                                                      })
                                                            .then(function (res) {
                                                                  document.getElementById('output').src = `${res.data.imagen}`
                                                                  debugger
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
                  document.getElementById('addCate').innerHTML = "Agregar Producto"
                  document.getElementById('Titulo').innerHTML = "Agregar Producto"
                  document.getElementById('ProveedorID').value = ''
                  document.getElementById('CategoriaID').value = ''
                  document.getElementById('Codigo').value = ''
                  document.getElementById('PrecioCompra').value = ''
                  document.getElementById('Descripcion').value = ''
                  document.getElementById('PrecioVenta').value = ''
                  $('#ProveedorID').selectpicker('refresh');
                  $('#CategoriaID').selectpicker('refresh');
                  Id = 0
                  document.getElementById('output').src = '/icons/nav/foto.jpg'
            }

            function addProduct() {
                  Foto = new Image()
                  Foto = document.getElementById('output');

                  //Recuerda Siempre cambiar el Src
                  if (Foto.src == `${window.location.origin}/icons/nav/foto.jpg`) {
                        Foto = ""
                  } else {
                        Foto = Img(Foto)
                  }
                  //Valores de los Inputs
                  var ProveedorID = +document.getElementById('ProveedorID').value
                  var CategoriaID = +document.getElementById('CategoriaID').value
                  var Codigo = document.getElementById('Codigo').value
                  var PrecioCompra = +document.getElementById('PrecioCompra').value
                  var Descripcion = document.getElementById('Descripcion').value
                  var PrecioVenta = +document.getElementById('PrecioVenta').value
                  var Fecha = new Date()
                  var Stock = +document.getElementById('Stock').value

                  if (ProveedorID == '' || CategoriaID == '' || Codigo == '' || PrecioCompra == '' || Descripcion == '' || PrecioVenta == '') {
                        swal({
                              title: "Campos Obligatorios",
                              icon: "warning",
                        });

                  } else {
                        switch (Id, true) {
                              case Id == null || Id == 0:
                                    axios.post(`${url}/Productos/Post`, {
                                          ID: Id,
                                          ProveedorID: ProveedorID,
                                          CategoriaID: CategoriaID,
                                          Imagen: Foto,
                                          Codigo: Codigo,
                                          PrecioCompra: PrecioCompra,
                                          Descripcion: Descripcion,
                                          PrecioVenta: PrecioVenta,
                                          Venta: 0,
                                          Fecha: Fecha,
                                          Stock: Stock
                                    }).then(function (response) {
                                          limpiar()
                                          $("#myModal").modal('hide');
                                          refreshTable('table', `${url}/Productos/GetAll`)

                                          //Alerta de Guardar
                                          swal({
                                                title: "Producto Guardado",
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
                                    axios.put(`${url}/Productos/Put/${Id}`, {
                                          ID: Id,
                                          ProveedorID: ProveedorID,
                                          Imagen: Foto,
                                          CategoriaID: CategoriaID,
                                          Codigo: Codigo,
                                          PrecioCompra: PrecioCompra,
                                          Descripcion: Descripcion,
                                          PrecioVenta: PrecioVenta,
                                          Venta: Venta,
                                          Fecha: Fecha,
                                          Stock: Stock,
                                    }).then(function (response) {
                                          limpiar()
                                          $("#myModal").modal('hide');
                                          refreshTable('table', `${url}/Productos/GetAll`)
                                          swal({
                                                title: "Producto Guardado",
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

            var loadFile = function (event) {
                  var image = document.getElementById('output');
                  image.src = URL.createObjectURL(event.target.files[0]);
            };

            function deletePhoto() {
                  document.getElementById('output').src = "/icons/nav/foto.jpg"
            }

            function add() {
                  $("#myModal").modal();
                  document.getElementById('addCate').innerHTML = "Agregar Producto"
                  document.getElementById('Titulo').innerHTML = "Agregar Producto"
            }

            function Categorias() {
                  var select = document.getElementById("CategoriaID");
                  axios.get(`${url}/Categorias/GetAll`, {
                        responseType: 'json'
                  })
                        .then(function (res) {
                              removeOptions(select)
                              var data = res.data;
                              for (var i = 0; i < data.length; i++) {
                                    var opt = data[i].categoria
                                    var option = document.createElement("option");
                                    option.textContent = opt;
                                    option.value = data[i].id;
                                    select.appendChild(option);
                              }
                              console.log(select)
                              $('#CategoriaID').selectpicker('refresh');
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

            function Proveedores() {
                  var select = document.getElementById("ProveedorID");
                  axios.get(`${url}/Proveedores/GetAll`, {
                        responseType: 'json'
                  })
                        .then(function (res) {
                              removeOptions(select)
                              var data = res.data;
                              for (var i = 0; i < data.length; i++) {
                                    var opt = data[i].nombre
                                    var option = document.createElement("option");
                                    option.textContent = opt;
                                    option.value = data[i].id;
                                    select.appendChild(option);
                              }
                              $('#ProveedorID').selectpicker('refresh');
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

            function removeOptions(selectElement) {
                  var i, L = selectElement.options.length - 1;
                  for (i = L; i >= 1; i--) {
                        selectElement.remove(i);
                  }
            }

            function deleteCategory() {
                  axios.delete(`${url}/Productos/Delete/${Id}`, {
                        responseType: 'json'
                  })
                        .then(function (res) {
                              limpiar()
                              $("#ModalDelete").modal('hide');
                              refreshTable('table', `${url}/Productos/GetAll`)
                              swal({
                                    title: "Producto Eliminado Correctamente",
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