const express = require('express');
const router = express.Router();

// Importar el controlador
const controladorProducto = require('../controladores/controladorProducto');

//ruta para el inicio
router.get('/', controladorProducto.index);

// Ruta para ver el detalle de un producto

router.get('/:id', controladorProducto.detalle);

// Ruta para ver los productos de una categoría

router.get('/categoria/:categoria', controladorProducto.verCategoria);

module.exports = router;