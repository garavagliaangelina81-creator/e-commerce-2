const express = require('express');
const router = express.Router();

const registroControlador = require('../controladores/registroControlador');
const validacionRegistro = require('../middlewares/validacionRegister');

router.get('/register', registroControlador.mostrarRegistro);

router.post('/register', validacionRegistro, registroControlador.procesarRegistro);

router.get('/login', registroControlador.login);

router.post('/login', registroControlador.procesoLogin);

module.exports = router;