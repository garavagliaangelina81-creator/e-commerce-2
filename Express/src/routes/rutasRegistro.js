const express = require('express');
const router = express.Router();

const registroControlador = require('../controladores/registroControlador');
const validacionRegistro = require('../middlewares/validacionRegister');

router.get('/register', registroControlador.mostrarRegistro);

router.post('/register', validacionRegistro, registroControlador.procesarRegistro);

router.get('/login', registroControlador.login);

router.post('/login', registroControlador.procesoLogin);

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error al destruir la sesión:", err);
            return res.redirect('/');
        }
        // se borra la cookie de sesión del navegador del usuario para que no pueda acceder a rutas protegidas después de cerrar sesión
        res.clearCookie('connect.sid'); 
        res.redirect('/');
    });
});

module.exports = router;