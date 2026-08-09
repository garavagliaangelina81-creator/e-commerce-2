const express = require('express');
const apiRouterUsuario = express.Router();
const loginControlador = require('./loginApiControlador');
const { login } = require('../../src/controladores/registroControlador');

apiRouterUsuario.post('/login', loginControlador.loginApi);
apiRouterUsuario.post('/logout', (req, res) => {
    res.clearCookie('token'); 
    res.status(200).json({ message: "Sesión cerrada correctamente" });
});
module.exports = apiRouterUsuario;