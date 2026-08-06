const express = require('express');
const apiRouterUsuario = express.Router();
const loginControlador = require('./loginApiControlador');

apiRouterUsuario.post('/login', loginControlador.loginApi);

module.exports = apiRouterUsuario;