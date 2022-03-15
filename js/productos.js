/* switch (user) {
    case user = null:
          window.location.replace('index.html')
          break;
    default:
          security() */

//Id para Edición Código
var Id = 0;
get()

/* Listado de Informes */
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
                                          { data: 'imagen' },
                                          { data: 'proveedor' },
                                          { data: 'codigo' },
                                          { data: 'description' },
                                          { data: 'categoria' },
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
                              $('#table tbody').on('click', 'tr', function () {
                                    var data = table.row(this).data();

                                    //Dividir Fecha por Sección Día, Mes y Año
                                    var elem = data.fecha.split('-')
                                    dia = elem[0]
                                    mes = elem[1]
                                    year = elem[2]

                                    //Agregando valores a Inputs.
                                    document.getElementById("Fecha").value = `${year}-${mes}-${dia}`
                                    document.getElementById("Departamento").value = data.departamento
                                    document.getElementById("Nombre").value = data.nombres
                                    document.getElementById("Oficio").value = data.oficio
                                    document.getElementById("Descripcion").value = data.descripcion
                                    document.getElementById("Observaciones").value = data.observaciones
                                    document.getElementById("TipoInforme").value = data.tipoInforme
                                    Id = data.id

                                    //Mensaje Emergente de Datos Seleccionados
                                    swal({
                                          title: `El Informe ${data.nombres} seleccionado`,
                                          text: 'Informe Seleccionado Correctamente',
                                          icon: `success`,
                                          buttons: false,
                                          timer: 2000

                                    })

                                    //Inicio de la Pagina
                                    window.scrollTo(0, 0)

                                    //Actualizar Selects del Codigo
                                    $('#Departamento').selectpicker('refresh');
                                    $('#TipoInforme').selectpicker('refresh');

                                    //Cambiar Botón Guardar por Editar
                                    document.getElementById("add").innerText = 'Editar'
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

/* Limpiar todos los Inputs */
function limpiar() {
      document.getElementById("Fecha").value = ''
      document.getElementById("Departamento").value = ''
      document.getElementById("Nombre").value = ''
      document.getElementById("Oficio").value = ''
      document.getElementById("Descripcion").value = ''
      document.getElementById("Observaciones").value = ''
      document.getElementById("TipoInforme").value = ''
      $('#Departamento').selectpicker('refresh');
      $('#TipoInforme').selectpicker('refresh');
      Id = 0
      document.getElementById("add").innerText = 'Guardar'
}

/* Crear Registro de Informe*/
function addUser() {
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

                        /* Crear Usuario */
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

// Actualiza la Tabla 
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
}

/*           break;
} */