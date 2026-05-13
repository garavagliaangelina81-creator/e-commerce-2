const { validationResult } = require('express-validator');
const registroModelo = require('../modelos/usuarioModel');

let listaUsuarios = [];

const registroControlador = {
    mostrarRegistro: (req, res) => {
        return res.render('pages/register',{ layout: false });
    },
    procesarRegistro: (req, res) => {
        
        const validacionResultante = validationResult(req); //trae los resultados de las validaciones hechas en el middleware
        //comprueba si hay errores, en caso de haberlos se renderiza la pagina y vuelve al formulario
            if(!validacionResultante.isEmpty()){ 
                return res.render('pages/register', {
                    errors: validacionResultante.mapped(), //convierte los errores en un objeto fácil de leer
                    oldData: req.body // oldData se usa para que no se pierda lo que ya escribio el usuario
                });
            }
            let usuarioExiste = registroModelo.buscarPorEmail(req.body.email);
            //si el usuario ya esta registrado manda un error avisando al usuario
            if(usuarioExiste) {
                return res.render('pages/register', {
                    errors: {
                        email: {msg: 'El email ya esta registrado'}
                    },
                    oldData: req.body
                });
            }
            //en caso de no estar registrado se agrega un nuevo usuario a la lista de usuarios
            const nuevoUsuario = {
                nombreU: req.body.nombreU,
                apellido: req.body.apellido, 
                email: req.body.email, 
                password: req.body.password
            };
            registroModelo.crear(nuevoUsuario);
            res.redirect('/login');
    }
};
module.exports = registroControlador;
