document.addEventListener('DOMContentLoaded', () => {
    const modalUsuarios = document.getElementById('modalGestionUsuarios');
    const modalProductos = document.getElementById('modalGestionProductos');
    const modalMateriaPrima = document.getElementById('modalGestionMateriaPrima');

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

    // Cargar datos para la tabla Producción por Usuario
    async function cargarDatosTablaProduccion() {
        try {
            const response = await fetch('/api/produccion');
            const datos = await response.json();

            const tablaProduccion = document.getElementById('tablaProduccion').querySelector('tbody');
            tablaProduccion.innerHTML = '';

            datos.forEach(prod => {
                const fila = tablaProduccion.insertRow();
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

    // Cargar datos para la tabla Registro Usuarios
    async function cargarDatosTablaUsuarios() {
        try {
            const response = await fetch('/api/usuarios');
            const datos = await response.json();

            const tablaUsuarios = document.getElementById('tablaUsuarios').querySelector('tbody');
            tablaUsuarios.innerHTML = '';

            datos.forEach(usuario => {
                const fila = tablaUsuarios.insertRow();
                fila.insertCell(0).innerText = usuario.id_usuario;
                fila.insertCell(1).innerText = usuario.nombre_usuario;
                fila.insertCell(2).innerText = usuario.fecha_creacion;
                fila.insertCell(3).innerText = usuario.ultimo_ingreso;
                fila.insertCell(4).innerText = usuario.ultima_salida;
                fila.insertCell(5).innerText = `$${usuario.suma_ventas}`;
            });
        } catch (error) {
            console.error('Error al cargar datos de usuarios:', error);
        }
    }

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

    // Inicializar datos al cargar la página
    cargarDatosTablaProduccion();
    cargarDatosTablaUsuarios();

    // Cerrar sesión
    document.getElementById('btnCerrarSesionAdmin').addEventListener('click', () => {
        localStorage.removeItem('adminLoggedIn'); // Eliminar flag de sesión
        alert('Sesión cerrada');
        window.location.href = '/';
    });
});