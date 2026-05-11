const express = require('express');
const router = express.Router();

// Importar el controlador
const controladorProducto = require('../controladores/controladorProducto');
const carritoControlador = require('../controladores/carritoControlador');

//ruta para el inicio
router.get('/', controladorProducto.index);

//US19: ruta para el buscador en el header (va antes del id porque express "piensa" que buscar es id)
router.get('/buscar', controladorProducto.buscar);

// Ruta para ver el detalle de un producto

router.get('/:id', controladorProducto.detalle);

/*Ruta para ver los productos de una categoría

router.get('/categoria/:categoria', controladorProducto.verCategoria);     ver si va acá
*/
module.exports = router;