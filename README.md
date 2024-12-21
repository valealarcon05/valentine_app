# frontendstatic

1. Base de Datos
Uso SQLite. Se diseñaron las siguientes tablas:

Usuarios:

id (Primaria)
nombre
rol (empleado/dueño)
contraseña (para los dueños)
Productos:

id (Primaria)
nombre
precio_unitario
sector (congelados/cantina/parrilla)
Producción:

id (Primaria)
id_usuario (Relación con Usuarios)
id_producto (Relación con Productos)
cantidad
fecha
MateriaPrima:

id (Primaria)
nombre
precio
cantidad_ingresada
fecha
Registro:

id (Primaria)
id_usuario (Relación con Usuarios)
tipo (ingreso/salida)
fecha_hora

2. Back-End
Uso Node.js con Express.js:

Endpoints
Usuarios:

Crear, editar y eliminar usuarios (disponible solo para el dueño).
Autenticación: /login (para el dueño).
Productos:

CRUD (Crear, Leer, Actualizar, Borrar productos).
Producción:

Registrar productos fabricados por los empleados.
Consultar producción por usuario y fecha (filtrado por empleado o todos para el dueño).
Materia Prima:

Registrar, editar, y consultar materia prima ingresada.
Comparar rendimientos (venta vs materia prima).
Estadísticas:

Rendimiento por producto (20-25%).
Ingresos por sector.
Verificación de uso de materia prima.

3. Front-End
Uso HTML, CSS, y JavaScript (con React.js o vanilla JavaScript para simplicidad).

Pantallas
Inicio:

Entrada de ID para empleados.
Botón para que el dueño acceda al inicio de sesión.
Dashboard de Empleados:

Mostrar:
Producción registrada por el empleado.
Botón para agregar productos fabricados.
Botón para cerrar sesión.
Dashboard del Dueño:

Mostrar:
Estadísticas (gráficas y tablas):
Rendimiento de productos.
Ingresos por sector.
Tablas de producción por usuario.
Botones para gestionar usuarios, productos y materia prima.

4. Diseño del Servidor
El servidor estará configurado para soportar al menos 10 conexiones simultáneas (3 empleados por turno y el dueño).

Configuración
Express.js: Crear API REST para manejar el CRUD.
Middleware: Usar autenticación básica (por ejemplo, JWT para el dueño).
Rutas protegidas: Limitar acceso a datos sensibles al dueño.

21/12/24: hice hasta insomnia, queda arreglar 3 solicitudes:
editar producto y materia prima error 404 bad request y para consultar ventas por usuario errpr 500 internal server error
22/12/24:
arreglar lo de insomnia
2. Configurar el Frontend
index.html: Configura el formulario para que los usuarios puedan ingresar o acceder como administrador.
Implementa los fetch API para interactuar con las rutas /api/login y /api/usuarios.
Dashboard-admin.html: 
Mostrar estadísticas, tablas de usuarios, productos, producción, ventas y materia prima.
Agregar botones o formularios para realizar operaciones de CRUD.
Dashboard-user.html:
Mostrar producción y ventas registradas.
Agregar formularios para registrar nuevas producciones o ventas.

3. Pruebas Completas
Realiza pruebas funcionales:
Verifica que los usuarios puedan iniciar sesión y realizar las acciones permitidas.
Comprueba que los datos enviados desde el frontend sean manejados correctamente por el backend.
Asegúrate de que las respuestas del backend actualicen dinámicamente las tablas en el frontend.

4. ¿Qué más se puede mejorar?
Si todo funciona correctamente, puedes:
Agregar autenticación JWT para proteger las rutas.
Crear un script de inicialización de base de datos para automatizar la creación de tablas.
Implementar pruebas automatizadas con Mocha y Chai. (a medio hacer, verificar esto)