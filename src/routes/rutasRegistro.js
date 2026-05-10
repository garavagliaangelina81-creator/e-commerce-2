const express = require('express');
const router = express.Router();

const registroControlador = require('../controladores/registroControlador');
const validacionRegistro = require('../middlewares/validacionRegister');

router.get('/register', registroControlador.mostrarRegistro);

router.post('/register', validacionRegistro, registroControlador.procesarRegistro);

module.exports = router;