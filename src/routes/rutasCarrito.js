const express = require('express');
const router = express.Router();

// Importar el controlador
const carritoControlador = require('../controladores/carritoControlador');

router.get('/', carritoControlador.verCarrito);

router.post('/agregar', carritoControlador.agregar);

module.exports = router;