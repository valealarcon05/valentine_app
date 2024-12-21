const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Generar una ruta absoluta
const dbPath = path.join(__dirname, '../db/empresa.db');
const db = new sqlite3.Database(dbPath);

// Producción
exports.crearProduccion = (req, res) => {
    const { id_usuario, id_producto, cantidad, fecha } = req.body;
    const query = `INSERT INTO Producción (id_usuario, id_producto, cantidad, fecha) VALUES (?, ?, ?, ?)`;
    db.run(query, [id_usuario, id_producto, cantidad, fecha], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Producción registrada', id: this.lastID });
    });
};

exports.obtenerProduccionPorEmpleado = (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM Producción WHERE id_usuario = ?`;
    db.all(query, [id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

exports.obtenerProduccionGeneral = (req, res) => {
    const query = `SELECT * FROM Producción`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

// Ventas
exports.obtenerVentasPorEmpleado = (req, res) => {
    const { id } = req.params;

    const query = `
        SELECT Productos.nombre AS nombre_producto, Ventas.cantidad, Ventas.total, Ventas.fecha, Ventas.sector
        FROM Ventas
        JOIN Productos ON Ventas.id_producto = Productos.id
        WHERE Ventas.id_usuario = ?
    `;

    db.all(query, [id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (rows.length) {
            return res.status(404).json({ error: "No se encontraron ventas para este usuario." });
        }
        res.json(rows);
    });
};

exports.crearVenta = (req, res) => {
    const { id_usuario, id_producto, cantidad, fecha, sector } = req.body;

    // Validar entrada
    if (!id_usuario || !id_producto || !cantidad || !fecha || !sector) {
        return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    const query = `
        INSERT INTO Ventas (id_usuario, id_producto, cantidad, fecha, sector)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(query, [id_usuario, id_producto, cantidad, fecha, sector], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Venta registrada con éxito.", id: this.lastID });
    });
};

exports.obtenerVentasGeneral = (req, res) => {
    const query = `SELECT * FROM Ventas`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

// Usuario
exports.crearUsuario = (req, res) => {
    const { nombre, rol, contraseña } = req.body;

    if (!nombre || !rol || (rol === 'dueño' && !contraseña)) {
        return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    const query = `INSERT INTO Usuarios (nombre, rol, contraseña) VALUES (?, ?, ?)`;
    db.run(query, [nombre, rol, contraseña || null], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Usuario creado', id: this.lastID });
    });
};

exports.listarUsuarios = (req, res) => {
    const query = `SELECT id, nombre, rol FROM Usuarios`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

exports.editarUsuario = (req, res) => {
    const { id } = req.params;
    const { nombre, rol, contraseña } = req.body;

    const query = `UPDATE Usuarios SET nombre = ?, rol = ?, contraseña = ? WHERE id = ?`;
    db.run(query, [nombre, rol, contraseña, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Usuario actualizado' });
    });
};

exports.eliminarUsuario = (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM Usuarios WHERE id = ?`;
    db.run(query, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Usuario eliminado' });
    });
};

exports.verificarAdmin = (req, res) => {
    const { usuario, contraseña } = req.body;

    // Simulación de credenciales válidas
    const credencialesValidas = {
        usuario: "admin",
        contraseña: "1234",
    };
    if (usuario === credencialesValidas.usuario && contraseña === credencialesValidas.contraseña) {
        res.status(200).json({ message: "Credenciales válidas." });
    } else {
        res.status(401).json({ error: "Credenciales incorrectas." });
    }
};


// Estadísticas
exports.obtenerEstadisticas = (req, res) => {
    // Simulación de datos: Obtén esto desde la base de datos
    const estadisticas = [
        { producto: 'Hamburguesas', rendimiento: 22 },
        { producto: 'Papas Fritas', rendimiento: 24 },
        { producto: 'Pollo', rendimiento: 20 },
    ];

    res.json(estadisticas);
};

exports.obtenerIngresos = (req, res) => {
    // Simulación de datos de ingresos
    const ingresos = [
        { sector: 'Congelados', total: 5000 },
        { sector: 'Cantina', total: 3000 },
        { sector: 'Parrilla', total: 7000 },
    ];

    res.json(ingresos);
};

// Crear Producto
exports.crearProducto = (req, res) => {
    const { nombre, precio, sector } = req.body;

    if (!nombre || !precio || !sector) {
        return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    const query = `INSERT INTO Productos (nombre, precio_unitario, sector) VALUES (?, ?, ?)`;
    db.run(query, [nombre, precio, sector], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Producto registrado', id: this.lastID });
    });
};

exports.listarProductos = (req, res) => {
    const query = `SELECT * FROM Productos`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

exports.editarProducto = (req, res) => {
    const { id } = req.params;
    const { nombre, precio, sector } = req.body;
    if (!nombre || !precio || !sector) {
        return res.status(400).json({ error: "Todos los campos (nombre, precio, sector) son obligatorios." });
    }

    const query = `UPDATE Productos SET nombre = ?, precio_unitario = ?, sector = ? WHERE id = ?`;
    db.run(query, [nombre, precio, sector, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Producto actualizado' });
    });
};

exports.eliminarProducto = (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM Productos WHERE id = ?`;
    db.run(query, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Producto eliminado' });
    });
};

// Materia Prima
exports.crearMateriaPrima = (req, res) => {
    const { nombre, precio, cantidad } = req.body;
    const query = `INSERT INTO MateriaPrima (nombre, precio, cantidad_ingresada, fecha) VALUES (?, ?, ?, ?)`;
    const fecha = new Date().toISOString().split('T')[0]; // Fecha actual
    db.run(query, [nombre, precio, cantidad, fecha], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Materia prima registrada', id: this.lastID });
    });
};

exports.listarMateriaPrima = (req, res) => {
    const query = `SELECT * FROM MateriaPrima`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

exports.editarMateriaPrima = (req, res) => {
    const { id } = req.params;
    const { nombre, precio, cantidad } = req.body;
    if (!nombre || !precio || !cantidad) {
        return res.status(400).json({ error: "Todos los campos (nombre, precio, cantidad) son obligatorios." });
    }

    const query = `UPDATE MateriaPrima SET nombre = ?, precio = ?, cantidad_ingresada = ? WHERE id = ?`;
    db.run(query, [nombre, precio, cantidad, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Materia prima actualizada' });
    });
};