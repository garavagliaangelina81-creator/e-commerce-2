const express = require('express');
const router = express.Router();
const autenticacionMiddleware = require('../middlewares/autenticacion');

const checkoutControlador = require('../controladores/checkoutControlador');

router.get('/checkout', autenticacionMiddleware, checkoutControlador.index);


module.exports = router;