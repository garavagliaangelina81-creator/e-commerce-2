const express = require('express');
const router = express.Router();

const checkoutControlador = require('../controladores/checkoutControlador');

router.get('/checkout', checkoutControlador.index);

module.exports = router;