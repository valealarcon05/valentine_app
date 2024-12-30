const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api');

// Producción
router.post('/api/produccion', apiController.crearProduccion);
router.get('/api/produccion', apiController.obtenerProduccionPorEmpleado);
router.get('/api/produccion/general', apiController.obtenerProduccionGeneral);
router.get('/api/produccion/:id',apiController.obtenerProduccionUsuarios);

// Ventas
router.post('/api/ventas', apiController.crearVenta);
router.get('/api/ventas', apiController.obtenerVentasGeneral);
router.get('/api/ventas/:id', apiController.obtenerVentasPorEmpleado);

// Usuarios
router.post('/api/usuarios', apiController.crearUsuario);
router.get('/api/usuarios', apiController.listarUsuarios);
router.put('/api/usuarios/:id', apiController.editarUsuario);
router.delete('/api/usuarios/:id', apiController.eliminarUsuario);
router.post('/api/usuarios/verificar-admin', apiController.verificarAdmin);
router.get('/api/usuarios/resumen', apiController.obtenerResumenUsuarios);

// Estadísticas
router.get('/api/estadisticas', apiController.obtenerEstadisticas);
router.get('/api/ingresos', apiController.obtenerIngresos);
router.get('/api/rendimiento', apiController.calcularRendimiento);

// Productos
router.post('/api/productos', apiController.crearProducto);
router.get('/api/productos', apiController.listarProductos);
router.put('/api/productos/:id', apiController.editarProducto);
router.delete('/api/productos/:id', apiController.eliminarProducto);

// Materia Prima
router.post('/api/materia-prima', apiController.crearMateriaPrima);
router.get('/api/materia-prima', apiController.listarMateriaPrima);
router.put('/api/materia-prima/:id', apiController.editarMateriaPrima);

module.exports = router;
