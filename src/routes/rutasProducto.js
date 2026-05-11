const express = require('express');
const router = express.Router();

// Importar el controlador
const controladorProducto = require('../controladores/controladorProducto');
const carritoControlador = require('../controladores/carritoControlador');

// Ruta para ver el detalle de un producto

router.get('/:id', controladorProducto.detalle);

/*Ruta para ver los productos de una categoría

router.get('/categoria/:categoria', controladorProducto.verCategoria);     ver si va acá
*/
module.exports = router;