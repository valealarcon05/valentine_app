const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'empresa.db');
const db = new sqlite3.Database(dbPath);


// Crear Tablas
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS Usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            rol TEXT NOT NULL,
            contraseña TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS Productos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            precio_unitario REAL NOT NULL,
            sector TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS Producción (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_usuario INTEGER NOT NULL,
            id_producto INTEGER NOT NULL,
            cantidad INTEGER NOT NULL,
            fecha DATE NOT NULL,
            FOREIGN KEY (id_usuario) REFERENCES Usuarios (id),
            FOREIGN KEY (id_producto) REFERENCES Productos (id)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS MateriaPrima (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            precio REAL NOT NULL,
            cantidad_ingresada REAL NOT NULL,
            fecha DATE NOT NULL
        )
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS Registro (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_usuario INTEGER NOT NULL,
            tipo TEXT NOT NULL,
            fecha_hora DATETIME NOT NULL,
            FOREIGN KEY (id_usuario) REFERENCES Usuarios(id)
        )
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS Ventas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_usuario INTEGER NOT NULL,
            id_producto INTEGER NOT NULL,
            cantidad INTEGER NOT NULL,
            fecha DATETIME NOT NULL,
            sector TEXT NOT NULL,
            FOREIGN KEY (id_usuario) REFERENCES Usuarios(id),
            FOREIGN KEY (id_producto) REFERENCES Productos(id)
        )
    `);
});

module.exports = db;
