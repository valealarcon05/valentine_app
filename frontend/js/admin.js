import config from './config.js';

document.addEventListener('DOMContentLoaded', () => {
const modalUsuarios = document.getElementById('modalGestionUsuarios');
const modalProductos = document.getElementById('modalGestionProductos');
const modalMateriaPrima = document.getElementById('modalGestionMateriaPrima');

// Funciones genéricas para edición y eliminación
    async function editarElemento(endpoint, id, datos) {
        try {
            const response = await fetch(`${endpoint}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos),
            });
            return response.ok;
        } catch (error) {
            console.error('Error al editar:', error);
            return false;
        }
    }

    async function eliminarElemento(endpoint, id) {
        try {
            const response = await fetch(`${endpoint}/${id}`, {
                method: 'DELETE',
            });
            return response.ok;
        } catch (error) {
            console.error('Error al eliminar:', error);
            return false;
        }
    }

    // Botones para abrir y cerrar modales
    document.getElementById('btnGestionUsuarios').addEventListener('click', () => {
        modalUsuarios.style.display = 'block';
    });

    document.getElementById('cerrarModalUsuarios').addEventListener('click', () => {
        modalUsuarios.style.display = 'none';
    });

    document.getElementById('btnGestionProductos').addEventListener('click', () => {
        modalProductos.style.display = 'block';
    });

    document.getElementById('cerrarModalProductos').addEventListener('click', () => {
        modalProductos.style.display = 'none';
    });

    document.getElementById('btnGestionMateriaPrima').addEventListener('click', () => {
        modalMateriaPrima.style.display = 'block';
    });

    document.getElementById('cerrarModalMateriaPrima').addEventListener('click', () => {
        modalMateriaPrima.style.display = 'none';
    });

    // Cerrar modal al hacer clic en el botón Cancelar dentro del formulario
    document.querySelector('#formGestionUsuarios button.btn-secondary').addEventListener('click', () => {
        modalUsuarios.style.display = 'none';
    });

    document.querySelector('#formGestionProductos button.btn-secondary').addEventListener('click', () => {
        modalProductos.style.display = 'none';
    });

    document.querySelector('#formGestionMateriaPrima button.btn-secondary').addEventListener('click', () => {
        modalMateriaPrima.style.display = 'none';
    });

    // Cargar datos para las tablas
    async function cargarDatosTablaProduccion() {
        const tablaProduccion = document.getElementById('tablaProduccion');
        if (!tablaProduccion) return;

        try {
            const response = await fetch('/api/produccion');
            const datos = await response.json();

            const tbody = tablaProduccion.querySelector('tbody');
            tbody.innerHTML = '';

            datos.forEach((prod) => {
                const fila = tbody.insertRow();
                fila.insertCell(0).innerText = prod.id_usuario;
                fila.insertCell(1).innerText = prod.nombre_usuario;
                fila.insertCell(2).innerText = prod.nombre_producto;
                fila.insertCell(3).innerText = prod.fecha;
                fila.insertCell(4).innerText = prod.cantidad;
            });
        } catch (error) {
            console.error('Error al cargar datos de producción:', error);
        }
    }

    async function cargarDatosTablaUsuarios() {
        const tablaUsuarios = document.getElementById('tablaUsuarios');
        if (!tablaUsuarios) return;

        try {
            const response = await fetch('/api/usuarios');
            const datos = await response.json();

            const tbody = tablaUsuarios.querySelector('tbody');
            tbody.innerHTML = '';

            datos.forEach((usuario) => {
                const fila = tbody.insertRow();
                fila.dataset.id = usuario.id_usuario;
                fila.insertCell(0).innerText = usuario.id_usuario;
                fila.insertCell(1).innerText = usuario.nombre_usuario;
                fila.insertCell(2).innerText = usuario.fecha_creacion;
                fila.insertCell(3).innerText = usuario.ultimo_ingreso;
                fila.insertCell(4).innerText = usuario.ultima_salida;
                fila.insertCell(5).innerText = `$${usuario.suma_ventas || 0}`;
                fila.insertCell(6).innerHTML = `
                    <button class="btn btn-warning btn-editar-usuario">Editar</button>
                    <button class="btn btn-danger btn-eliminar-usuario">Eliminar</button>
                `;
            });
        } catch (error) {
            console.error('Error al cargar datos de usuarios:', error);
        }
    }

    async function cargarDatosTablaMateriaPrima() {
        const tablaMateriaPrima = document.getElementById('tablaMateriaPrima');
        if (!tablaMateriaPrima) return;

        try {
            const response = await fetch('/api/materia-prima');
            const datos = await response.json();

            const tbody = tablaMateriaPrima.querySelector('tbody');
            tbody.innerHTML = '';

            datos.forEach((item) => {
                const fila = tbody.insertRow();
                fila.dataset.id = item.id;
                fila.insertCell(0).innerText = item.nombre;
                fila.insertCell(1).innerText = item.fecha || 'N/A';
                fila.insertCell(2).innerText = item.cantidad || 0;
                fila.insertCell(3).innerText = item.unidad || 'Otro';
                fila.insertCell(4).innerText = item.sector || 'N/A';
                fila.insertCell(5).innerHTML = `
                    <button class="btn btn-warning btn-editar-materia-prima">Editar</button>
                    <button class="btn btn-danger btn-eliminar-materia-prima">Eliminar</button>
                `;
            });
        } catch (error) {
            console.error('Error al cargar datos de materia prima:', error);
        }
    }

    async function cargarDatosTablaVentas() {
        const tablaVentas = document.getElementById('tablaVentas');
        if (!tablaVentas) return;

        try {
            const response = await fetch('/api/ventas/detalles');
            const datos = await response.json();

            const tbody = tablaVentas.querySelector('tbody');
            tbody.innerHTML = '';

            datos.forEach((venta) => {
                const fila = tbody.insertRow();
                fila.insertCell(0).innerText = venta.producto || 'Producto desconocido';
                fila.insertCell(1).innerText = `$${venta.precio_venta || 0}`;
                fila.insertCell(2).innerText = `$${venta.precio_compra || 0}`;
                fila.insertCell(3).innerText = new Date(venta.fecha).toLocaleDateString();
            });
        } catch (error) {
            console.error('Error al cargar datos de ventas:', error);
        }
    }
     // Eventos de edición y eliminación
    document.addEventListener('click', async (event) => {
        if (event.target.classList.contains('btn-editar-usuario')) {
            const id = event.target.closest('tr').dataset.id;
            const nuevoNombre = prompt('Nuevo nombre:');
            const nuevoSector = prompt('Nuevo sector:');
            const exito = await editarElemento('/api/usuarios', id, { nombre: nuevoNombre, sector: nuevoSector });
            if (exito) cargarDatosTablaUsuarios();
        }

        if (event.target.classList.contains('btn-eliminar-usuario')) {
            const id = event.target.closest('tr').dataset.id;
            const exito = confirm('¿Eliminar usuario?') && (await eliminarElemento('/api/usuarios', id));
            if (exito) cargarDatosTablaUsuarios();
        }

        if (event.target.classList.contains('btn-editar-materia-prima')) {
            const id = event.target.closest('tr').dataset.id;
            const nuevoNombre = prompt('Nuevo nombre:');
            const nuevaCantidad = prompt('Nueva cantidad:');
            const nuevoPrecio = prompt('Nuevo precio:');
            const exito = await editarElemento('/api/materia-prima', id, {
                nombre: nuevoNombre,
                cantidad: nuevaCantidad,
                precio: nuevoPrecio,
            });
            if (exito) cargarDatosTablaMateriaPrima();
        }

        if (event.target.classList.contains('btn-eliminar-materia-prima')) {
            const id = event.target.closest('tr').dataset.id;
            const exito = confirm('¿Eliminar materia prima?') && (await eliminarElemento('/api/materia-prima', id));
            if (exito) cargarDatosTablaMateriaPrima();
        }
    });

        // Gráficos con Chart.js
        const ctxRendimiento = document.getElementById('graficoRendimiento').getContext('2d');
        const graficoRendimiento = new Chart(ctxRendimiento, {
        type: 'bar',
        data: {
            labels: ['Cantina', 'Congelados', 'Parrilla'],
            datasets: [{
            label: '% Rendimiento',
                data: [70, 85, 90], // Datos simulados
                backgroundColor: ['#007bff', '#28a745', '#ffc107']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
                tooltip: { enabled: true }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    const ctxIngresos = document.getElementById('graficoIngresos').getContext('2d');
    const graficoIngresos = new Chart(ctxIngresos, {
        type: 'pie',
        data: {
            labels: ['Cantina', 'Congelados', 'Parrilla'],
            datasets: [{
                label: 'Ingresos ($)',
                data: [3000, 5000, 7000], // Datos simulados
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                tooltip: { enabled: true }
            }
        }
    });

    // Inicializar tablas
    cargarDatosTablaProduccion();
    cargarDatosTablaUsuarios();
    cargarDatosTablaMateriaPrima();
    cargarDatosTablaVentas();

    // Cerrar sesión
    document.getElementById('btnCerrarSesionAdmin').addEventListener('click', () => {
        localStorage.removeItem('adminLoggedIn');
        alert('Sesión cerrada');
        window.location.href = '/';
    });
});


// Editar usuario
    //document.addEventListener('click', async (event) => {
  //  if (event.target.classList.contains('btn-editar-usuario')) {
//        const idUsuario = event.target.closest('tr').dataset.id;

  //      const nuevoNombre = prompt('Ingrese el nuevo nombre:');
//        const nuevoSector = prompt('Ingrese el nuevo sector:');

       // try {
        //    const response = await fetch(`/api/usuarios/${idUsuario}`, {
      //          method: 'PUT',
    //            headers: { 'Content-Type': 'application/json' },
  //              body: JSON.stringify({ nombre: nuevoNombre, sector: nuevoSector }),
//            });

            //if (response.ok) {
                //alert('Usuario editado correctamente.');
              //  cargarDatosTablaUsuarios(); // Refrescar tabla
            //} else {
            //    alert('Error al editar usuario.');
          //  }
        //} catch (error) {
      //      console.error('Error al editar usuario:', error);
    //    }
  //  }
//});

//Eliminar usuario
//document.addEventListener('click', async (event) => {
  //  if (event.target.classList.contains('btn-eliminar-usuario')) {
//        const idUsuario = event.target.closest('tr').dataset.id;

        //if (confirm('¿Está seguro de eliminar este usuario?')) {
      //      try {
    //            const response = await fetch(`/api/usuarios/${idUsuario}`, {
  //                  method: 'DELETE',
//                });

                //if (response.ok) {
                   // alert('Usuario eliminado correctamente.');
                 //   cargarDatosTablaUsuarios(); // Refrescar tabla
               // } else {
             //       alert('Error al eliminar usuario.');
           //     }
         //   } catch (error) {
       //         console.error('Error al eliminar usuario:', error);
     //       }
   //     }
 //   }
//});

// Editar producto
//document.addEventListener('click', async (event) => {
  //  if (event.target.classList.contains('btn-editar-producto')) {
//        const idUsuario = event.target.closest('tr').dataset.id;

      //  // Aquí muestra un modal o un formulario con los datos a editar
    //    const nuevoNombre = prompt('Ingrese el nuevo producto:');
  //      const nuevoSector = prompt('Ingrese el nuevo sector:');
//        const nuevoPrecio = prompt('Ingrese el nuevo precio');

        //try {
          //  const response = await fetch(`/api/productos/${idProducto}`, {
        //        method: 'PUT',
      //          headers: { 'Content-Type': 'application/json' },
    //            body: JSON.stringify({ nombre: nuevoNombre, sector: nuevoSector, precio:nuevoPrecio }),
////            });

            //if (response.ok) {
                //alert('Producto editado correctamente.');
              //  cargarDatosTablaProduccion(); // Refrescar tabla
            //} else {
            //    alert('Error al editar producto.');
          //  }
        //} catch (error) {
      //      console.error('Error al editar Producto.', error);
    //    }
  //  }
//});

// Eliminar producto
//document.addEventListener('click', async (event) => {
  //  if (event.target.classList.contains('btn-eliminar-producto')) {
//        const idUsuario = event.target.closest('tr').dataset.id;

        //if (confirm('¿Está seguro de eliminar este producto?')) {
      //      try {
    //            const response = await fetch(`/api/productos/${idProducto}`, {
  //                  method: 'DELETE',
//                });

               // if (response.ok) {
                    //alert('Producto eliminado correctamente.');
                  //  cargarDatosTablaUsuarios(); // Refrescar tabla
                //} else {
              //      alert('Error al eliminar producto.');
            //    }
          //  } catch (error) {
        //        console.error('Error al eliminar producto:', error);
      //      }
    //    }
  //  }
//});

//Editar materia prima
//document.addEventListener('click', async (event) => {
  //  if (event.target.classList.contains('btn-editar-materia-prima')) {
//        const idMateriaPrima = event.target.closest('tr').dataset.id;

    //    const nuevoNombre = prompt('Ingrese el nuevo nombre de la materia prima:');
  //      const nuevaCantidad = prompt('Ingrese la nueva cantidad:');
//        const nuevoPrecio = prompt('Ingrese el nuevo precio:');

        //try {
        //    const response = await fetch(`/api/materia-prima/${idMateriaPrima}`, {
      //          method: 'PUT',
    //            headers: { 'Content-Type': 'application/json' },
  //              body: JSON.stringify({ nombre: nuevoNombre, cantidad: nuevaCantidad, precio: nuevoPrecio }),
//            });

           // if (response.ok) {
               // alert('Materia prima editada correctamente.');
             //   cargarDatosTablaMateriaPrima(); // Refrescar tabla
           // } else {
            //    alert('Error al editar materia prima.');
          //  }
        //} catch (error) {
      //      console.error('Error al editar materia prima:', error);
    //    }
  //  }
//});

//Eliminar materia prima
//document.addEventListener('click', async (event) => {
  //  if (event.target.classList.contains('btn-eliminar-materia-prima')) {
    //    const idMateriaPrima = event.target.closest('tr').dataset.id;

//        if (confirm('¿Está seguro de eliminar esta materia prima?')) {
  //          try {
    //            const response = await fetch(`/api/materia-prima/${idMateriaPrima}`, {
      //              method: 'DELETE',
        //        });

              //  if (response.ok) {
                   // alert('Materia prima eliminada correctamente.');
                 //   cargarDatosTablaMateriaPrima(); // Refrescar tabla
               // } else {
               //     alert('Error al eliminar materia prima.');
             //   }
           // } catch (error) {
         //       console.error('Error al eliminar materia prima:', error);
       //     }
     //   }
   // }
//});


    // Inicializar datos al cargar la página

    //cargarDatosTablaProduccion();
    //cargarDatosTablaUsuarios();
    //cargarDatosTablaMateriaPrima();
  //  cargarDatosTablaVentas();
//});

    // Cerrar sesión
//    document.getElementById('btnCerrarSesionAdmin').addEventListener('click', () => {
  //      localStorage.removeItem('adminLoggedIn'); // Eliminar flag de sesión
    //    alert('Sesión cerrada');
      //  window.location.href = '/';
    //});
