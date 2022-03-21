switch (user) {
    case user = null:
        window.location.replace('/index.html')
        break;
    default:
        //security()

        //Id para Edición Código
        var ProductoID = 0;
        var NombreProducto = ''
        var Neto = 0
        security()
        Comprobante()
        Cliente()
        tableProducts()

        function get() {
            //Request Get Datatable
            axios.get(`${url}/Ventas/GetAll`, {
                responseType: 'json'
            })
                .then(function (res) {
                    if (res.status == 200) {
                        $(document).ready(function () {
                            $('#table').DataTable({

                                //Agregando datos recibidos a aray data
                                data: res.data,


                                //Columnas de las tablas
                                columns: [
                                    { data: 'codigo' },
                                    { data: 'productos' },
                                    { data: 'total' },
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
        
        function limpiar() {
            document.getElementById('ComprobanteID').value = ""
            document.getElementById('ClienteID').value = ""
            document.getElementById('Codigo').value = ""
            document.getElementById('Total').value = ""
            document.getElementById('Descuento').value = ""
            document.getElementById('UsuarioID').value = ""
            document.getElementById('MetodoPago').value = ""
            document.getElementById('Moneda').value = ""
            $('#ComprobanteID').selectpicker('refresh');
            $('#ClienteID').selectpicker('refresh');
            ProductoID = ''
            NombreProducto = ''
            Neto = ''
        }

        function addProduct() {
            //Valores de los Inputs
            var ComprobanteID = +document.getElementById('ComprobanteID').value
            var ClienteID = +document.getElementById('ClienteID').value
            var Codigo = document.getElementById('Codigo').value
            var Total = +document.getElementById('Total').value
            var Descuento = +document.getElementById('Descuento').value
            var UsuarioID = document.getElementById('UsuarioID').value
            var MetodoPago = document.getElementById('MetodoPago').value
            var Moneda = document.getElementById('Moneda').value
            var Fecha = new Date()

            if (ComprobanteID == '' || ClienteID == '' || Codigo == '' || Total == '' || UsuarioID == '' || MetodoPago == '' || Moneda == '' || Fecha == "") {
                swal({
                    title: "Campos Obligatorios",
                    icon: "warning",
                });

            } else {
                axios.post(`${url}/Ventas/Post/${UsuarioID}`, {
                    Codigo: Codigo,
                    Productos: NombreProducto,
                    Moneda: Moneda,
                    Descuento: Descuento,
                    Neto: Neto,
                    Total: Total,
                    MetodoPago: MetodoPago,
                    Fecha: Fecha,
                    UsuarioID: 1,
                    ClienteID: ClienteID,
                    ProductoID: ProductoID,
                    ComprobanteID: ComprobanteID,
                }).then(function (response) {
                    limpiar()
                    refreshTable('table', `${url}/Ventas/GetAll`)

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
            document.getElementById('UsuarioID').value = localStorage.getItem('User')
            $("#myModal").modal();
        }

        function Comprobante() {
            var select = document.getElementById("ComprobanteID");
            axios.get(`${url}/Comprobantes/GetAll`, {
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
                    $('#ComprobanteID').selectpicker('refresh');
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

        function Cliente() {
            var select = document.getElementById("ClienteID");
            axios.get(`${url}/Clientes/GetAll`, {
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
                    $('#ClienteID').selectpicker('refresh');
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

        function tableProducts() {
            //Request Get Datatable
            axios.get(`${url}/Productos/GetAll`, {
                responseType: 'json'
            })
                .then(function (res) {
                    if (res.status == 200) {
                        $(document).ready(function () {
                            var tableProducts = $('#tableProducts').DataTable({

                                //Agregando datos recibidos a aray data
                                data: res.data,


                                //Columnas de las tablas
                                columns: [
                                    { data: 'codigo' },
                                    { data: 'descripcion' },
                                    { data: 'stock' },
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
                            $('#tableProducts tbody').on('click', 'tr', function () {
                                var data = tableProducts.row(this).data();
                                if (data.stock == 0)
                                    swal({
                                        title: 'Este producto no posee más',
                                        icon: 'warning'
                                    })

                                else {
                                    document.getElementById('Codigo').value = data.codigo
                                    document.getElementById('Total').value = data.precioVenta
                                    Neto = data.precioVenta
                                    ProductoID = data.id
                                    NombreProducto = data.descripcion
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
        break;
} 