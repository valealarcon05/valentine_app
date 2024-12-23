const empleadoID = 1; // Simula un empleado logueado

// Crear formulario dinámico para "Agregar Producción"
document.getElementById("btnAgregarProduccion").addEventListener("click", () => {
    const container = document.createElement("div");
    container.classList.add("modal", "fade");
    container.id = "modalProduccion";
    container.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Agregar Producción</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="formProduccion">
                        <div class="mb-3">
                            <label for="sectorProduccion" class="form-label">Sector:</label>
                            <select id="sectorProduccion" class="form-select">
                                <option value="congelados">Congelados</option>
                                <option value="cantina">Cantina</option>
                                <option value="parrilla">Parrilla</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="productoProduccion" class="form-label">Producto:</label>
                            <select id="productoProduccion" class="form-select">
                                <option value="empanada">Empanada</option>
                                <option value="pollo">Pollo</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="cantidadProduccion" class="form-label">Cantidad:</label>
                            <input type="number" class="form-control" id="cantidadProduccion" min="1" required>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" class="btn btn-primary">Registrar Producción</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(container);

    const modal = new bootstrap.Modal(document.getElementById("modalProduccion"));
    modal.show();

    // Manejar el envío del formulario
    document.getElementById("formProduccion").addEventListener("submit", async (e) => {
        e.preventDefault();
        const sector = document.getElementById("sectorProduccion").value;
        const producto = document.getElementById("productoProduccion").value;
        const cantidad = document.getElementById("cantidadProduccion").value;
        const fecha = new Date().toISOString();


    if (!sector || !producto || !cantidad || cantidad <= 0) {
        alert("Todos los campos son obligatorios y la cantidad debe ser mayor a 0.");
        return;
    }
        try {
            const response = fetch("/api/produccion", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id_usuario: empleadoID, producto, cantidad, fecha, sector }),
            });

            if (response.ok) {
                alert("Producción registrada con éxito.");
                cargarProduccionEmpleado(empleadoID);
            } else {
                alert("Error al registrar la producción.");
            }
        } catch (error) {
            console.error("Error al registrar producción:", error);
        } finally {
            modal.hide();
            container.remove();
            document.getElementById("btnAgregarProduccion").focus();
        }
    });
});


// Crear formulario dinámico para "Agregar Venta"
document.getElementById("btnAgregarVenta").addEventListener("click", () => {
    const container = document.createElement("div");
    container.classList.add("modal", "fade");
    container.id = "modalVenta";
    container.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Agregar Venta</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="formVenta">
                        <div class="mb-3">
                            <label for="productoVenta" class="form-label">Producto:</label>
                            <select id="productoVenta" class="form-select">
                                <option value="empanada">Empanada</option>
                                <option value="pollo">Pollo</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="cantidadVenta" class="form-label">Cantidad:</label>
                            <input type="number" class="form-control" id="cantidadVenta" min="1" required>
                        </div>
                        <div class="mb-3">
                            <label for="sectorVenta" class="form-label">Sector:</label>
                            <select id="sectorVenta" class="form-select">
                                <option value="congelados">Congelados</option>
                                <option value="cantina">Cantina</option>
                                <option value="parrilla">Parrilla</option>
                            </select>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" class="btn btn-primary">Registrar Venta</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(container);
    new bootstrap.Modal(document.getElementById("modalVenta")).show();

    // Manejar el envío del formulario
    document.getElementById("formVenta").addEventListener("submit", async (e) => {
        e.preventDefault();
        const producto = document.getElementById("productoVenta").value;
        const cantidad = document.getElementById("cantidadVenta").value;
        const sector = document.getElementById("sectorVenta").value;
        const fecha = new Date().toISOString();

        try {
            const response = await fetch("/api/ventas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id_usuario: empleadoID, producto, cantidad, sector, fecha }),
            });

            if (response.ok) {
                alert("Venta registrada con éxito.");
                cargarVentasEmpleado(empleadoID);
            } else {
                alert("Error al registrar la venta.");
            }
        } catch (error) {
            console.error("Error al registrar ventas:", error);
        } finally {
            document.getElementById("modalVenta").remove();
        }
    });
});


// Cerrar sesión
document.getElementById("btnCerrarSesion").addEventListener("click", () => {
    //alert("Sesión cerrada.");
    window.location.href = "/"; // Redirige al index.html
});

// Cargar Producción Registrada
async function cargarProduccionEmpleado(empleadoID) {
    try {
        const response = await fetch(`/api/produccion/${empleadoID}`);
        const produccion = await response.json();

        const tabla = document.getElementById("produccionTabla").querySelector("tbody");
        tabla.innerHTML = ""; // Limpiar tabla

        
        produccion.forEach((item) => {
            const fechaHora = item.fecha ? item.fecha.split("T") : ["Fecha inválida", "Hora inválida"];
            const fecha = fechaHora[0];
            const hora = fechaHora[1]?.slice(0, 5) || "N/A";

            const fila = tabla.insertRow();
            fila.insertCell(0).innerText = item.nombre_producto || "Producto desconocido"; // Nombre del producto
            fila.insertCell(1).innerText = item.cantidad || "0"; // Cantidad producida
            fila.insertCell(2).innerText = fecha; // Fecha (YYYY-MM-DD)
            fila.insertCell(3).innerText = hora; // Hora (HH:MM)
        });

    } catch (error) {
        console.error("Error al cargar la producción:", error);
    }
}

// Cargar Ventas Registradas
async function cargarVentasEmpleado(empleadoID) {
    try {
        const response = await fetch(`/api/ventas/${empleadoID}`);
        const ventas = await response.json();

        const tabla = document.getElementById("ventasTabla").querySelector("tbody");
        tabla.innerHTML = ""; // Limpiar tabla

        ventas.forEach((venta) => {
            const fila = tabla.insertRow();
            fila.insertCell(0).innerText = venta.nombre_producto;
            fila.insertCell(1).innerText = venta.cantidad;
            fila.insertCell(2).innerText = `$${venta.precio_unitario.toFixed(2)}`;
            fila.insertCell(3).innerText = `$${venta.total.toFixed(2)}`;
            fila.insertCell(4).innerText = venta.fecha.split("T")[0];
            fila.insertCell(5).innerText = venta.fecha.split("T")[1].slice(0, 5);
        });
    } catch (error) {
        console.error("Error al cargar las ventas:", error);
    }
}

// Cargar Materia Prima
async function cargarMateriaPrima() {
    try {
        const response = await fetch("/api/materia-prima");
        const materiaPrima = await response.json();

        const tabla = document.getElementById("materiaPrimaTabla").querySelector("tbody");
        tabla.innerHTML = ""; // Limpiar tabla

        materiaPrima.forEach((item) => {
            const fila = tabla.insertRow();
            fila.insertCell(0).innerText = item.nombre;
            fila.insertCell(1).innerText = item.cantidad_ingresada;
            fila.insertCell(2).innerText = `$${item.precio.toFixed(2)}`;
        });
    } catch (error) {
        console.error("Error al cargar materia prima:", error);
    }
}

// Inicializar tablas al cargar
cargarProduccionEmpleado(empleadoID);
cargarVentasEmpleado(empleadoID);
cargarMateriaPrima();
