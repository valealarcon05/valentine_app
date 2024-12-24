const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api');

// Usuarios
router.post('/usuarios', apiController.crearUsuario);
router.get('/usuarios', apiController.listarUsuarios);
router.put('/usuarios/:id', apiController.editarUsuario);
router.delete('/usuarios/:id', apiController.eliminarUsuario);
router.post('/admin/login', apiController.verificarAdmin);


// Productos
router.post('/productos', apiController.crearProducto);
router.get('/productos', apiController.listarProductos);
router.put('/productos/:id', apiController.editarProducto);
router.delete('/productos/:id', apiController.eliminarProducto);

// Producción
router.post('/produccion', apiController.crearProduccion);
router.get('/produccion', apiController.obtenerProduccionGeneral);
router.get('/api/produccion', apiController.obtenerProduccionUsuarios);
router.get('/api/produccion/:id', api.obtenerProduccionPorEmpleado);

// Ventas
router.get('/ventas/:id', apiController.obtenerVentasPorEmpleado);
router.post('/ventas', apiController.crearVenta);
router.get('/ventas', apiController.obtenerVentasGeneral);

// Materia Prima
router.post('/materia-prima', apiController.crearMateriaPrima);
router.get('/materia-prima', apiController.listarMateriaPrima);
router.put('/materia-prima/:id', apiController.editarMateriaPrima);

// Estadísticas
router.get('/estadisticas', apiController.obtenerEstadisticas);
router.get('/ingresos', apiController.obtenerIngresos);
router.get('/produccion/rendimiento', apiController.calcularRendimiento);


module.exports = router;
