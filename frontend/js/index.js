// Redirección para empleados desde el formulario
document.getElementById("loginEmpleado").addEventListener("submit", (e) => {
    e.preventDefault();
    const empleadoID = document.getElementById("empleadoID").value;

    if (empleadoID) {
        window.location.href = "/dashboard-user.html";
    } else {
        alert("Por favor, ingrese un ID válido.");
    }
});

// Redirección para el dueño desde el botón
document.getElementById("adminLogin").addEventListener("click", () => {
    window.location.href = "/dashboard-admin.html";
});

// Mostrar formulario de login
document.getElementById("adminLogin").addEventListener("click", () => {
    document.getElementById("formLoginAdmin").style.display = "block";
});

// Cerrar formulario de login
document.getElementById("cerrarFormLoginAdmin").addEventListener("click", () => {
    document.getElementById("formLoginAdmin").style.display = "none";
});

// Verificar credenciales del administrador
document.getElementById("formAdminLogin").addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = document.getElementById("usuarioAdmin").value;
    const contraseña = document.getElementById("contraseñaAdmin").value;

    try {
        const response = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, contraseña }),
        });

        if (response.ok) {
            localStorage.setItem("adminLoggedIn", "true");
            alert("Inicio de sesión exitoso.");
            window.location.href = "/dashboard-admin.html";
        } else {
            alert("Credenciales incorrectas.");
        }
    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Si el administrador ya está logueado, redirigir al dashboard
    if (localStorage.getItem("adminLoggedIn") === "true") {
        window.location.href = "/dashboard-admin.html";
    }
});
