const express = require('express');
const router = express.Router();

// Importar el controlador
const carritoControlador = require('../controladores/carritoControlador');
const carritoServicio = require('../servicios/carritoServicio');

router.get('/', carritoControlador.verCarrito);

router.post('/agregar', carritoControlador.agregar);

router.get('/sumar/:id', carritoControlador.sumar);

router.get('/restar/:id', carritoControlador.restar);

router.get('/eliminar/:id', carritoControlador.eliminar);

router.get('/vaciar', carritoControlador.vaciar);

module.exports = router;