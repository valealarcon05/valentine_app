// Cargar la producción de todos los usuarios
async function cargarProduccionUsuarios() {
    try {
        const response = await fetch('/api/produccion');
        const produccion = await response.json();

        const tabla = document.getElementById('tablaProduccion').querySelector('tbody');
        tabla.innerHTML = ''; // Limpiar tabla

        produccion.forEach((item) => {
            const fila = tabla.insertRow();
            fila.insertCell(0).innerText = item.nombre_usuario; // Nombre del usuario
            fila.insertCell(1).innerText = item.nombre_producto; // Nombre del producto
            fila.insertCell(2).innerText = item.cantidad;
            fila.insertCell(3).innerText = item.fecha.split('T')[0]; // Fecha
            fila.insertCell(4).innerText = item.fecha.split('T')[1].slice(0, 5); // Hora
        });
    } catch (error) {
        console.error('Error al cargar la producción de los usuarios:', error);
    }
}

// Cargar producción al cargar la página
cargarProduccionUsuarios();

// Botones de Gestión
document.getElementById('btnGestionUsuarios').addEventListener('click', () => {
    alert('Abrir formulario de gestión de usuarios.');
    // Aquí puedes implementar la lógica para abrir un modal o redirigir a otra página.
});

document.getElementById('btnGestionProductos').addEventListener('click', () => {
    alert('Abrir formulario de gestión de productos.');
    // Implementa la lógica para abrir un modal o redirigir a otra página.
});

document.getElementById('btnGestionMateriaPrima').addEventListener('click', () => {
    alert('Abrir formulario de gestión de materia prima.');
    // Implementa la lógica para abrir un modal o redirigir a otra página.
});

// Estadísticas: Placeholder (puedes integrar gráficos con Chart.js o similar)
async function cargarEstadisticas() {
    try {
        // Simulación de datos estadísticos (deberían venir del backend)
        const estadisticas = [
            { producto: 'Hamburguesas', rendimiento: 22 },
            { producto: 'Papas Fritas', rendimiento: 24 },
            { producto: 'Pollo', rendimiento: 20 },
        ];

        const tablaEstadisticas = document.getElementById('tablaEstadisticas').querySelector('tbody');
        tablaEstadisticas.innerHTML = ''; // Limpiar tabla

        estadisticas.forEach((item) => {
            const fila = tablaEstadisticas.insertRow();
            fila.insertCell(0).innerText = item.producto;
            fila.insertCell(1).innerText = `${item.rendimiento}%`;
        });
    } catch (error) {
        console.error('Error al cargar estadísticas:', error);
    }
}

// Cargar estadísticas al cargar la página
cargarEstadisticas();

// Cargar estadísticas de rendimiento
async function cargarGraficoRendimiento() {
    try {
        const response = await fetch('/api/estadisticas'); // Ruta para estadísticas
        const estadisticas = await response.json();

        const ctxRendimiento = document.getElementById('graficoRendimiento').getContext('2d');
        new Chart(ctxRendimiento, {
            type: 'bar',
            data: {
                labels: estadisticas.map((item) => item.producto),
                datasets: [{
                    label: 'Rendimiento (%)',
                    data: estadisticas.map((item) => item.rendimiento),
                    backgroundColor: ['#4caf50', '#2196f3', '#ff5722'], // Colores de las barras
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true },
                    tooltip: { enabled: true },
                },
                scales: {
                    y: { beginAtZero: true },
                },
            },
        });
    } catch (error) {
        console.error('Error al cargar el gráfico de rendimiento:', error);
    }
}

cargarGraficoRendimiento();

// Cargar gráfico de ingresos por sectores
async function cargarGraficoIngresos() {
    try {
        // Simulación de datos: Esto debería venir del backend
        const ingresos = [
            { sector: 'Congelados', total: 5000 },
            { sector: 'Cantina', total: 3000 },
            { sector: 'Parrilla', total: 7000 },
        ];

        const ctxIngresos = document.getElementById('graficoIngresos').getContext('2d');
        new Chart(ctxIngresos, {
            type: 'pie',
            data: {
                labels: ingresos.map((item) => item.sector),
                datasets: [{
                    label: 'Ingresos ($)',
                    data: ingresos.map((item) => item.total),
                    backgroundColor: ['#f44336', '#3f51b5', '#ffc107'], // Colores de los sectores
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true, position: 'top' },
                    tooltip: { enabled: true },
                },
            },
        });
    } catch (error) {
        console.error('Error al cargar el gráfico de ingresos:', error);
    }
}

cargarGraficoIngresos();

document.getElementById("btnCerrarSesionAdmin").addEventListener("click", () => {
    localStorage.removeItem("adminLoggedIn");
    alert("Sesión cerrada.");
    window.location.href = "/"; // Redirige al index
});

// Mostrar modal de gestión de usuarios
document.getElementById('btnGestionUsuarios').addEventListener('click', () => {
    document.getElementById('modalGestionUsuarios').style.display = 'block';
});

// Cerrar modal de gestión de usuarios
document.getElementById('cerrarModalUsuarios').addEventListener('click', () => {
    document.getElementById('modalGestionUsuarios').style.display = 'none';
});

// Mostrar modal de gestión de productos
document.getElementById('btnGestionProductos').addEventListener('click', () => {
    document.getElementById('modalGestionProductos').style.display = 'block';
});

// Cerrar modal de gestión de productos
document.getElementById('cerrarModalProductos').addEventListener('click', () => {
    document.getElementById('modalGestionProductos').style.display = 'none';
});

// Mostrar modal de gestión de materia prima
document.getElementById('btnGestionMateriaPrima').addEventListener('click', () => {
    document.getElementById('modalGestionMateriaPrima').style.display = 'block';
});

// Cerrar modal de gestión de materia prima
document.getElementById('cerrarModalMateriaPrima').addEventListener('click', () => {
    document.getElementById('modalGestionMateriaPrima').style.display = 'none';
});

// Enviar datos de usuarios al servidor
document.getElementById('formGestionUsuarios').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombreUsuario').value;
    const rol = document.getElementById('rolUsuario').value;
    const contraseña = document.getElementById('contraseñaUsuario').value;

    try {
        const response = await fetch('/api/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, rol, contraseña }),
        });

        if (response.ok) {
            alert('Usuario registrado con éxito.');
            document.getElementById('modalGestionUsuarios').style.display = 'none';
        } else {
            alert('Error al registrar el usuario.');
        }
    } catch (error) {
        console.error('Error al registrar usuario:', error);
    }
});

// Enviar datos de productos al servidor
document.getElementById('formGestionProductos').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombreProducto').value;
    const precio = document.getElementById('precioProducto').value;
    const sector = document.getElementById('sectorProducto').value;

    try {
        const response = await fetch('/api/productos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, precio, sector }),
        });

        if (response.ok) {
            alert('Producto registrado con éxito.');
            document.getElementById('modalGestionProductos').style.display = 'none';
        } else {
            alert('Error al registrar el producto.');
        }
    } catch (error) {
        console.error('Error al registrar producto:', error);
    }
});

// Enviar datos de materia prima al servidor
document.getElementById('formGestionMateriaPrima').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombreMateriaPrima').value;
    const precio = document.getElementById('precioMateriaPrima').value;
    const cantidad = document.getElementById('cantidadMateriaPrima').value;

    try {
        const response = await fetch('/api/materia-prima', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, precio, cantidad }),
        });

        if (response.ok) {
            alert('Materia prima registrada con éxito.');
            document.getElementById('modalGestionMateriaPrima').style.display = 'none';
        } else {
            alert('Error al registrar la materia prima.');
        }
    } catch (error) {
        console.error('Error al registrar materia prima:', error);
    }
});
