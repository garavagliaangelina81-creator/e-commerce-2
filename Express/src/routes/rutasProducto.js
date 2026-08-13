const express = require('express');
const router = express.Router();
const controladorProducto = require('../controladores/controladorProducto');
const carritoControlador = require('../controladores/carritoControlador');

//react pida datos en JSON
router.get('/api/productos', controladorProducto.obtenerTodosApi);
//ruta para el inicio
router.get('/', controladorProducto.index);

router.get('/categoria/:categoria', controladorProducto.verCategoria);

// ruta para el buscador en el header (va antes del id porque express "piensa" que buscar es id)
router.get('/buscar', controladorProducto.buscar);

// Ruta para ver el detalle de un producto
router.get('/:id', controladorProducto.detalle);

module.exports = router;