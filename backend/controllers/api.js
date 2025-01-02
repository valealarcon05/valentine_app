import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../db/empresa.db');
const db = new sqlite3.Database(dbPath);

// Producción
export const crearProduccion = (req, res) => {
    const { id_usuario, id_producto, cantidad, fecha, sector } = req.body;
    if (!id_usuario || !id_producto || !cantidad) {
        return res.status(400).json({ error: "Faltan campos obligatorios: id_usuario, id_producto o cantidad." });
    }
    const query = `INSERT INTO Producción (id_usuario, id_producto, cantidad, fecha, sector) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [id_usuario, id_producto, cantidad, fecha, sector], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Producción registrada', id: this.lastID });
    });
};

export const obtenerProduccionPorEmpleado = (_req, res) => {
    const query = `
        SELECT 
            Producción.id_usuario,
            Usuarios.nombre AS nombre_usuario,
            Productos.nombre AS nombre_producto,
            Producción.cantidad,
            Producción.fecha,
            Producción.sector
        FROM Producción
        INNER JOIN Productos ON Producción.id_producto = Productos.id
        INNER JOIN Usuarios ON Producción.id_usuario = Usuarios.id;
    `;

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

export const obtenerProduccionGeneral = (_req, res) => {
    const query = `SELECT * FROM Producción`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

export const obtenerProduccionUsuarios = (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT 
            Producción.id_usuario,
            Usuarios.nombre AS nombre_usuario,
            Productos.nombre AS nombre_producto,
            Producción.cantidad,
            Producción.fecha,
            Producción.sector
        FROM Producción
        INNER JOIN Productos ON Producción.id_producto = Productos.id
        INNER JOIN Usuarios ON Producción.id_usuario = Usuarios.id
        WHERE Producción.id_usuario = ?;
    `;

    db.all(query, [id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

// Ventas
export const crearVenta = (req, res) => {
    const { id_usuario, id_producto, cantidad, fecha, sector } = req.body;

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

export const obtenerVentasGeneral = (_req, res) => {
    const query = `SELECT * FROM Ventas`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

export const obtenerVentasPorEmpleado = (req, res) => {
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
        if (!rows.length) {
            return res.status(404).json({ error: "No se encontraron ventas para este usuario." });
        }
        res.json(rows);
    });
};

// Usuario
export const crearUsuario = (req, res) => {
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

export const listarUsuarios = (_, res) => {
    const query = `SELECT id, nombre, rol FROM Usuarios`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

export const editarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, rol, contraseña } = req.body;

    try {
        await db.run('UPDATE Usuarios SET nombre = ?, sector = ? WHERE id = ?', [nombre, sector, id]);
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        console.error('Error al editar usuario:', error);
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};

export const eliminarUsuario = async (req, res) => {
    const { id } = req.params;

try {
        await db.run('DELETE FROM Usuarios WHERE id = ?', [id]);
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
};

export const verificarAdmin = async (req, res) => {
    const { usuario, contraseña } = req.body;

    try {
        // Busca el usuario en la base de datos
        const admin = await db.get('SELECT * FROM Usuarios WHERE nombre = ? AND clave = ? AND role = "admin"', [usuario, contraseña]);

        if (admin) {
            // Si las credenciales son correctas, retorna un mensaje de éxito
            res.status(200).json({ message: 'Inicio de sesión exitoso' });
        } else {
            // Si no coinciden las credenciales, retorna un error 401
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error('Error al verificar el administrador:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export const obtenerResumenUsuarios = (_req, res) => {
    const query = `
        SELECT 
            u.id AS id_usuario,
            u.nombre AS nombre_usuario,
            u.rol AS rol_usuario,
            u.fecha_creacion,
            COALESCE((SELECT MAX(r.fecha_hora) FROM Registro r WHERE r.id_usuario = u.id AND r.tipo = 'ingreso'), 'N/A') AS ultimo_ingreso,
            COALESCE((SELECT MAX(r.fecha_hora) FROM Registro r WHERE r.id_usuario = u.id AND r.tipo = 'salida'), 'N/A') AS ultima_salida,
            COALESCE((SELECT SUM(v.total) FROM Ventas v WHERE v.id_usuario = u.id), 0) AS suma_ventas
        FROM Usuarios u;
    `;

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

export const obtenerEstadisticas = (_req, res) => {
    const estadisticas = [
        { producto: 'Hamburguesas', rendimiento: 22 },
        { producto: 'Papas Fritas', rendimiento: 24 },
        { producto: 'Pollo', rendimiento: 20 },
    ];

    res.json(estadisticas);
};

export const obtenerIngresos = (_req, res) => {
    const ingresos = [
        { sector: 'Congelados', total: 5000 },
        { sector: 'Cantina', total: 3000 },
        { sector: 'Parrilla', total: 7000 },
    ];

    res.json(ingresos);
};

export const calcularRendimiento = (_req, res) => {
    const query = `
        SELECT 
            Productos.nombre AS producto,
            SUM(Producción.cantidad) AS total_producido,
            SUM(Ventas.cantidad) AS total_vendido,
            (SUM(Ventas.cantidad) * 100.0 / SUM(Producción.cantidad)) AS rendimiento
        FROM Producción
        LEFT JOIN Ventas ON Producción.id_producto = Ventas.id_producto
        JOIN Productos ON Producción.id_producto = Productos.id
        GROUP BY Productos.id
    `;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error al calcular rendimiento:', err.message);
            return res.status(500).json({ error: err.message });
        }

        const resultados = rows.map((row) => ({
            producto: row.producto,
            total_producido: row.total_producido,
            total_vendido: row.total_vendido,
            rendimiento: row.rendimiento ? `${row.rendimiento.toFixed(2)}%` : 'N/A',
            dentro_del_objetivo: row.rendimiento >= 20 ? 'Sí' : 'No'
        }));

        res.json(resultados);
    });
};

// Productos
export const crearProducto = (req, res) => {
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

export const listarProductos = (_req, res) => {
    const query = `SELECT * FROM Productos`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

export const editarProducto = (req, res) => {
    const { id } = req.params;
    const { nombre, precio, sector } = req.body;

    const query = `UPDATE Productos SET nombre = ?, precio_unitario = ?, sector = ? WHERE id = ?`;
    db.run(query, [nombre, precio, sector, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Producto actualizado' });
    });
};

export const eliminarProducto = (req, res) => {
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
export const crearMateriaPrima = (req, res) => {
    const { nombre, precio, cantidad } = req.body;
    const query = `INSERT INTO MateriaPrima (nombre, precio, cantidad_ingresada, fecha) VALUES (?, ?, ?, ?)`;
    const fecha = new Date().toISOString().split('T')[0];
    db.run(query, [nombre, precio, cantidad, fecha], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Materia prima registrada', id: this.lastID });
    });
};

export const listarMateriaPrima = (_req, res) => {
    const query = `SELECT * FROM MateriaPrima`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

export const editarMateriaPrima = (req, res) => {
    const { id } = req.params;
    const { nombre, precio, cantidad } = req.body;

    const query = `UPDATE MateriaPrima SET nombre = ?, precio = ?, cantidad_ingresada = ? WHERE id = ?`;
    db.run(query, [nombre, precio, cantidad, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Materia prima actualizada' });
    });
};