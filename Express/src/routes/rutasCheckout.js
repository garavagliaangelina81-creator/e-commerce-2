const express = require('express');
const router = express.Router();
const autenticacionMiddleware = require('../middlewares/autenticacion');

const checkoutControlador = require('../controladores/checkoutControlador');

router.get('/checkout', autenticacionMiddleware, checkoutControlador.index); //se pone el middleware de autenticacion primero para que no permita el acceso a la vista hasta que no se inicie sesion 


module.exports = router;