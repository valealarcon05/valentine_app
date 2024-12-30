Valentine Cocina Application

Introducción

Valentine Cocina es una aplicación diseñada para registrar el inventario de actividades de los empleados, incluyendo producción, ventas y el uso de materia prima. Además, proporciona un panel de administración para que los dueños gestionen usuarios, productos y consultas sobre el rendimiento.

Requisitos Previos

Antes de comenzar, asegúrese de tener instalado lo siguiente:

Node.js (versión 14 o superior): Descargar Node.js

SQLite: Descargar SQLite

Instalación

Siga estos pasos para configurar el entorno:

Clone el repositorio:

git clone https://github.com/usuario/valentine_cocina.git
cd valentine_cocina

Instale las dependencias:

npm install

Configure la base de datos:

El archivo SQLite ya está configurado en backend/db/empresa.db. Si necesita inicializar nuevamente las tablas, utilice el script en models.js.

Ejecute el servidor:

node backend/server.js

La aplicación estará disponible en http://localhost:3000.

Configuración del Backend

Estructura de Archivos

/backend/routes/routes.js: Define las rutas de la API.

/backend/controllers/api.js: Controladores para gestionar la lógica del backend.

/backend/models/models.js: Configuración de las tablas y triggers de SQLite.

/backend/server.js: Configuración del servidor Express.

Rutas de la API

Usuarios

Crear usuario: POST /api/usuarios

Listar usuarios: GET /api/usuarios

Editar usuario: PUT /api/usuarios/:id

Eliminar usuario: DELETE /api/usuarios/:id

Productos

Crear producto: POST /api/productos

Listar productos: GET /api/productos

Editar producto: PUT /api/productos/:id

Eliminar producto: DELETE /api/productos/:id

Producción

Registrar producción: POST /api/produccion

Consultar producción general: GET /api/produccion

Consultar producción por empleado: GET /api/produccion/:id

Ventas

Registrar venta: POST /api/ventas

Consultar ventas por empleado: GET /api/ventas/:id

Consultar todas las ventas: GET /api/ventas

Materia Prima

Registrar materia prima: POST /api/materia-prima

Consultar materia prima: GET /api/materia-prima

Estadísticas

Obtener rendimiento: GET /api/estadisticas

Obtener ingresos: GET /api/ingresos

Configuración del Frontend

Páginas

index.html: Página principal con formularios de acceso para empleados y dueños.

dashboard-user.html: Panel de empleados con datos de producción y ventas.

dashboard-admin.html: Panel de administración con funcionalidades para gestionar usuarios, productos y consultar estadísticas.

Recursos

CSS: Archivos en frontend/css.

JavaScript: Lógica en frontend/js para interacción con la API.

Ejecución de Pruebas

Las pruebas están implementadas en api.test.mjs usando Mocha y Chai.

Instale Mocha y Chai:

npm install mocha chai chai-http --save-dev

Ejecute las pruebas:

npx mocha backend/tests/api.test.mjs

Documentación de la API

Para documentar y probar la API, puede usar Swagger:

Instale Swagger UI:

npm install swagger-ui-express --save

Configure Swagger en server.js:

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

Cree un archivo swagger.json para definir las rutas y esquemas.

Acceda a la documentación en http://localhost:3000/api-docs.

Contacto

Para soporte, comuníquese con el desarrollador al correo em.cn.alarcon.valentina@gmail.com