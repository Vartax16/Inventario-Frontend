switch (user) {
    case user = null:
        window.location.replace('/index.html')
        break;
    default:
        security()
        getProduct()
        getCompras()
        document.getElementById('Compras').hidden = true
        document.getElementById('Productos').hidden = true
        document.getElementById('ReportesCompras').style.color = 'black'
        document.getElementById('ReportesProductos').style.color = 'black'
        document.getElementById('ReporteVentas').style.color = '#F2AA1F'

        function get() {
            //Request Get Datatable
            axios.get(`${url}/Ventas/GetAll`, {
                responseType: 'json'
            })
                .then(function (res) {
                    if (res.status == 200) {
                        $(document).ready(function () {
                            $('#tableVentas').DataTable({

                                //Agregando datos recibidos a aray data
                                data: res.data,


                                //Columnas de las tablas
                                columns: [
                                    { data: 'codigo' },
                                    { data: 'productos' },
                                    { data: 'moneda' },
                                    { data: 'descuento' },
                                    { data: 'neto' },
                                    { data: 'total' },
                                    { data: 'metodoPago' },
                                    { data: 'fecha' },
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

        function getCompras() {
            //Request Get Datatable
            axios.get(`${url}/Compras/GetAll`, {
                responseType: 'json'
            })
                .then(function (res) {
                    if (res.status == 200) {
                        $(document).ready(function () {
                            $('#tableCompras').DataTable({

                                //Agregando datos recibidos a aray data
                                data: res.data,


                                //Columnas de las tablas
                                columns: [
                                    { data: 'productos' },
                                    { data: 'fecha' },
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

        function getProduct() {
            //Request Get Datatable
            axios.get(`${url}/Productos/GetAll`, {
                responseType: 'json'
            })
                .then(function (res) {
                    if (res.status == 200) {
                        $(document).ready(function () {
                            var tableProductos = $('#tableProductos').DataTable({

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
                            $('#tableProductos tbody').on('click', 'a', function () {
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

        function ReporteVentas() {
            document.getElementById('Compras').hidden = true
            document.getElementById('Productos').hidden = true
            document.getElementById('Ventas').hidden = false
            document.getElementById('ReportesCompras').style.color = 'black'
            document.getElementById('ReportesProductos').style.color = 'black'
            document.getElementById('ReporteVentas').style.color = '#F2AA1F'

        }

        function ReportesProductos() {
            document.getElementById('Compras').hidden = true
            document.getElementById('Productos').hidden = false
            document.getElementById('Ventas').hidden = true

            document.getElementById('ReportesCompras').style.color = 'black'
            document.getElementById('ReportesProductos').style.color = '#F2AA1F'
            document.getElementById('ReporteVentas').style.color = 'black'

        }

        function ReportesCompras() {
            document.getElementById('Compras').hidden = false
            document.getElementById('Productos').hidden = true
            document.getElementById('Ventas').hidden = true

            document.getElementById('ReportesCompras').style.color = '#F2AA1F'
            document.getElementById('ReportesProductos').style.color = 'black'
            document.getElementById('ReporteVentas').style.color = 'black'
        }

        function generateC() {
            var doc = new jsPDF('l', 'pt', 'letter');
            doc.setFont("Times-Roman");
            var htmlstring = '';
            var tempVarToCheckPageHeight = 0;
            var pageHeight = 0;
            pageHeight = doc.internal.pageSize.height;
            specialElementHandlers = {
                '#bypassme': function (element, renderer) {
                    return true
                }
            };
            margins = {
                top: 150,
                bottom: 60,
                left: 40,
                right: 40,
                width: 600
            };
            var y = 20;
            doc.setLineWidth(2);
            doc.text(310, y = y + 30, "Reporte de Compras");

            //Generar Tabla por Html
            doc.autoTable({
                html: '#tableCompras',
                startY: 70,
                styles: { font: "Times-Roman" },
                theme: 'grid',
                styles: {
                    minCellHeight: 5
                }
            })
            doc.save(`Reporte de Compras.pdf`);
        }

        function generateP() {
            var doc = new jsPDF('l', 'pt', 'letter');
            doc.setFont("Times-Roman");
            var htmlstring = '';
            var tempVarToCheckPageHeight = 0;
            var pageHeight = 0;
            pageHeight = doc.internal.pageSize.height;
            specialElementHandlers = {
                '#bypassme': function (element, renderer) {
                    return true
                }
            };
            margins = {
                top: 150,
                bottom: 60,
                left: 40,
                right: 40,
                width: 600
            };
            var y = 20;
            doc.setLineWidth(2);
            doc.text(310, y = y + 30, "Reporte de Productos");

            //Generar Tabla por Html
            doc.autoTable({
                html: '#tableProductos',
                startY: 70,
                styles: { font: "Times-Roman" },
                theme: 'grid',
                styles: {
                    minCellHeight: 5
                }
            })
            doc.save(`Reporte de Productos.pdf`);
        }

        function generateV() {
            var doc = new jsPDF('l', 'pt', 'letter');
            doc.setFont("Times-Roman");
            var htmlstring = '';
            var tempVarToCheckPageHeight = 0;
            var pageHeight = 0;
            pageHeight = doc.internal.pageSize.height;
            specialElementHandlers = {
                '#bypassme': function (element, renderer) {
                    return true
                }
            };
            margins = {
                top: 150,
                bottom: 60,
                left: 40,
                right: 40,
                width: 600
            };
            var y = 20;
            doc.setLineWidth(2);
            doc.text(310, y = y + 30, "Reporte de Ventas");

            //Generar Tabla por Html
            doc.autoTable({
                html: '#tableVentas',
                startY: 70,
                styles: { font: "Times-Roman" },
                theme: 'grid',
                styles: {
                    minCellHeight: 5
                }
            })
            doc.save(`Reporte de Ventas.pdf`);

        }
        break;
} 