const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const usuariosFilePath = path.join(__dirname, '../../data/usuarios.json');

let listaUsuarios = [];
const registroControlador = {
    mostrarRegistro: (req, res) => {
        return res.render('pages/register'); 
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
            let usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8')); //lee el archivo json donde se guardan los usuarios
            //si no hay errores de validacion, se busca al usuario
            let usuarioExiste = usuarios.find(u => u.email === req.body.email);
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
            usuarios.push(nuevoUsuario);
            fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, ' '));

            res.redirect('/login');
    }
};
module.exports = registroControlador;
