import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';

const { expect } = chai.expect;
chai.use(chaiHttp);

describe('Pruebas de API', () => {
  let usuarioId; // ID del usuario creado
  let productoId; // ID del producto creado
  let materiaPrimaId; // ID de la materia prima creada

  // -----------------------------------------
  // Usuarios
  // -----------------------------------------
  describe('Usuarios', () => {
    it('Debe crear un usuario', (done) => {
      chai.request(app)
        .post('/api/usuarios')
        .send({ nombre: 'Usuario Prueba', rol: 'empleado', contraseña: '123456' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Usuario creado');
          expect(res.body).to.have.property('id');
          usuarioId = res.body.id;
          done();
        });
    });

    it('Debe listar todos los usuarios', (done) => {
      chai.request(app)
        .get('/api/usuarios')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('Debe editar un usuario', (done) => {
      chai.request(app)
        .put(`/api/usuarios/${usuarioId}`)
        .send({ nombre: 'Usuario Actualizado', rol: 'dueño', contraseña: '654321' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Usuario actualizado');
          done();
        });
    });

    it('Debe eliminar un usuario', (done) => {
      chai.request(app)
        .delete(`/api/usuarios/${usuarioId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Usuario eliminado');
          done();
        });
    });
  });

  // -----------------------------------------
  // Productos
  // -----------------------------------------
  describe('Productos', () => {
    it('Debe crear un producto', (done) => {
      chai.request(app)
        .post('/api/productos')
        .send({ nombre: 'Producto Prueba', precio: 10.5, sector: 'congelados' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Producto registrado');
          expect(res.body).to.have.property('id');
          productoId = res.body.id;
          done();
        });
    });

    it('Debe listar todos los productos', (done) => {
      chai.request(app)
        .get('/api/productos')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('Debe editar un producto', (done) => {
      chai.request(app)
        .put(`/api/productos/${productoId}`)
        .send({ nombre: 'Producto Actualizado', precio: 15.0, sector: 'parrilla' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Producto actualizado');
          done();
        });
    });

    it('Debe eliminar un producto', (done) => {
      chai.request(app)
        .delete(`/api/productos/${productoId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Producto eliminado');
          done();
        });
    });
  });

  // -----------------------------------------
  // Producción
  // -----------------------------------------
  describe('Producción', () => {
    it('Debe registrar producción', (done) => {
      chai.request(app)
        .post('/api/produccion')
        .send({ id_usuario: 1, id_producto: 1, cantidad: 100, fecha: '2024-12-21' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Producción registrada');
          done();
        });
    });

    it('Debe listar la producción general', (done) => {
      chai.request(app)
        .get('/api/produccion')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  // -----------------------------------------
  // Ventas
  // -----------------------------------------
  describe('Ventas', () => {
    it('Debe registrar una venta', (done) => {
      chai.request(app)
        .post('/api/ventas')
        .send({
          id_usuario: 1,
          id_producto: 1,
          cantidad: 10,
          fecha: '2024-12-21T10:00:00Z',
          sector: 'cantina'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Venta registrada con éxito.');
          done();
        });
    });

    it('Debe listar todas las ventas', (done) => {
      chai.request(app)
        .get('/api/ventas')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  // -----------------------------------------
  // Materia Prima
  // -----------------------------------------
  describe('Materia Prima', () => {
    it('Debe registrar materia prima', (done) => {
      chai.request(app)
        .post('/api/materia-prima')
        .send({ nombre: 'Carne', precio: 100, cantidad: 50 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Materia prima registrada');
          expect(res.body).to.have.property('id');
          materiaPrimaId = res.body.id;
          done();
        });
    });

    it('Debe listar toda la materia prima', (done) => {
      chai.request(app)
        .get('/api/materia-prima')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('Debe editar materia prima', (done) => {
      chai.request(app)
        .put(`/api/materia-prima/${materiaPrimaId}`)
        .send({ nombre: 'Carne Actualizada', precio: 120, cantidad: 60 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Materia prima actualizada');
          done();
        });
    });
  });

  // -----------------------------------------
  // Estadísticas
  // -----------------------------------------
  describe('Estadísticas', () => {
    it('Debe obtener estadísticas de rendimiento', (done) => {
      chai.request(app)
        .get('/api/estadisticas')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('Debe obtener ingresos por sector', (done) => {
      chai.request(app)
        .get('/api/ingresos')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
});
