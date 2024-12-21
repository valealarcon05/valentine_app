const empleadoID = 1; // Simula un empleado logueado

// Cerrar sesión
document.getElementById("btnCerrarSesion").addEventListener("click", () => {
    alert("Sesión cerrada.");
    window.location.href = "/"; // Redirige al index
});

// Mostrar formulario de agregar producción
document.getElementById("btnAgregarProduccion").addEventListener("click", () => {
    document.getElementById("formProduccion").style.display = "block";
});

// Cerrar el formulario de agregar producción
document.getElementById("cerrarFormProduccion").addEventListener("click", () => {
    document.getElementById("formProduccion").style.display = "none";
});

// Enviar producción al servidor
document.getElementById("formProduccionEmpleado").addEventListener("submit", async (e) => {
    e.preventDefault();

    const producto = document.getElementById("producto").value;
    const cantidad = document.getElementById("cantidad").value;
    const fecha = new Date().toISOString(); // Fecha y hora exacta

    try {
        const response = await fetch("/api/produccion", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id_usuario: empleadoID,
                id_producto: producto,
                cantidad: cantidad,
                fecha: fecha,
            }),
        });

        if (response.ok) {
            alert("Producción registrada con éxito.");
            document.getElementById("formProduccion").style.display = "none";
            cargarProduccionEmpleado(empleadoID); // Recargar la tabla de producción
        } else {
            alert("Error al registrar la producción.");
        }
    } catch (error) {
        console.error("Error al registrar producción:", error);
    }
});

// Cargar la producción registrada por el empleado
async function cargarProduccionEmpleado(empleadoID) {
    try {
        const response = await fetch(`/api/produccion/${empleadoID}`);
        const produccion = await response.json();

        const tabla = document.getElementById("produccionTabla").querySelector("tbody");
        tabla.innerHTML = ""; // Limpiar tabla

        produccion.forEach((item) => {
            const fila = tabla.insertRow();
            fila.insertCell(0).innerText = item.nombre_producto; // Nombre del producto
            fila.insertCell(1).innerText = item.cantidad; // Cantidad producida
            fila.insertCell(2).innerText = item.fecha.split("T")[0]; // Fecha (YYYY-MM-DD)
            fila.insertCell(3).innerText = item.fecha.split("T")[1].slice(0, 5); // Hora (HH:MM)
        });
    } catch (error) {
        console.error("Error al cargar la producción:", error);
    }
}

// Cargar ventas registradas por el empleado
async function cargarVentasEmpleado(empleadoID) {
    try {
        const response = await fetch(`/api/ventas/${empleadoID}`);
        const ventas = await response.json();

        const tabla = document.getElementById("ventasTabla").querySelector("tbody");
        tabla.innerHTML = ""; // Limpiar tabla

        ventas.forEach((venta) => {
            const fila = tabla.insertRow();
            fila.insertCell(0).innerText = venta.nombre_producto; // Nombre del producto
            fila.insertCell(1).innerText = venta.cantidad; // Cantidad vendida
            fila.insertCell(2).innerText = `$${venta.precio_unitario.toFixed(2)}`; // Precio unitario
            fila.insertCell(3).innerText = `$${(venta.cantidad * venta.precio_unitario).toFixed(2)}`; // Total
            fila.insertCell(4).innerText = venta.fecha.split("T")[0]; // Fecha (YYYY-MM-DD)
            fila.insertCell(5).innerText = venta.fecha.split("T")[1].slice(0, 5); // Hora (HH:MM)
        });
    } catch (error) {
        console.error("Error al cargar las ventas:", error);
    }
}

// Mostrar formulario de ventas
document.getElementById("btnVerVentas").addEventListener("click", () => {
    cargarVentasEmpleado(empleadoID);
    document.getElementById("formVentas").style.display = "block";
});

// Cerrar el formulario de ventas
document.getElementById("cerrarFormVentas").addEventListener("click", () => {
    document.getElementById("formVentas").style.display = "none";
});

// Registrar ventas
document.getElementById("formRegistrarVentas").addEventListener("submit", async (e) => {
    e.preventDefault();

    const producto = document.getElementById("productoVenta").value;
    const cantidad = document.getElementById("cantidadVenta").value;
    const sector = document.getElementById("sectorVenta").value;
    const fecha = new Date().toISOString();

    try {
        const response = await fetch("/api/ventas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id_usuario: empleadoID,
                id_producto: producto,
                cantidad: cantidad,
                fecha: fecha,
                sector: sector,
            }),
        });

        if (response.ok) {
            alert("Venta registrada con éxito.");
            document.getElementById("formVentas").style.display = "none";
            cargarVentasEmpleado(empleadoID); // Recargar la tabla de ventas
        } else {
            alert("Error al registrar la venta.");
        }
    } catch (error) {
        console.error("Error al registrar ventas:", error);
    }
});

// Inicializar cargado de datos al inicio
cargarProduccionEmpleado(empleadoID);
cargarVentasEmpleado(empleadoID);
