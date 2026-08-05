const express = require('express');
const router = express.Router();
const autenticacionMiddleware = require('../middlewares/autenticacion');
// Importar el controlador
const carritoControlador = require('../controladores/carritoControlador');
const carritoServicio = require('../servicios/carritoServicio');

router.get('/', autenticacionMiddleware, carritoControlador.mostrar); //ruta para mostrar el carrito solo si el usuario esta logueado

router.post('/agregar', carritoControlador.agregar);

router.get('/sumar/:id', carritoControlador.sumar);

router.get('/restar/:id', carritoControlador.restar);

router.get('/eliminar/:id', carritoControlador.eliminar);

router.get('/vaciar', carritoControlador.vaciar);

module.exports = router;