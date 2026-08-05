const express = require('express');
const apiRouterCategoria = express.Router();
const loginControlador = require('./loginApiControlador');

apiRouterCategoria.post('/login', loginControlador.loginApi);