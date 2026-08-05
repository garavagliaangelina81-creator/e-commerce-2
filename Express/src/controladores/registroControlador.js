const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/database');

const registroControlador = {
    mostrarRegistro: (req, res) => {
        return res.render('pages/register',{ layout: false });
    },
    procesarRegistro: async (req, res) => {
        const validacionResultante = validationResult(req); //trae los resultados de las validaciones hechas en el middleware

        //comprueba si hay errores, en caso de haberlos se renderiza la pagina y vuelve al formulario
            if(!validacionResultante.isEmpty()){ 
                return res.render('pages/register', {
                    errors: validacionResultante.mapped(), //convierte los errores en un objeto fácil de leer
                    oldData: req.body // oldData se usa para que no se pierda lo que ya escribio el usuario
                });
            }
            const { nombreU, apellido, email, password } = req.body;

            //verifica si el email ya esta registrado en la base de datos
            db.get('SELECT * FROM usuarios WHERE email = ?', [email], async (err, usuarioExiste) => {
                if(usuarioExiste) {
                    return res.render('pages/register', {
                        errors: { email: {msg: 'El email ya esta registrado'} },
                        oldData: req.body
                    });
                }
                const saltRounds = 10; //sirve para generar un hash seguro (10 es un numero de iteraciones, mientras mas alto mas seguro pero mas lento)
                const hashPassword = await bcrypt.hash(password, saltRounds); //genera el hash de la contraseña
            
                //inserta el nuevo usuario en la base de datos con el hash de la contraseña
                db.run(`INSERT INTO usuarios (nombre, apellido, email, password_hash, rol) VALUES (?, ?, ?, ?, 'cliente')`, 
                    [nombreU, apellido, email, hashPassword], (err) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).send('Error al registrar el usuario');
                        }
                        return res.redirect('/login');
                    }
                );
            });
    },
    login: (req, res) => {
        res.render('pages/login', { layout: false });
    },
    procesoLogin: (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render('pages/login', {
                errors: errors.mapped(),
                oldData: req.body,
                layout: false
            });
        }
        const { email, password } = req.body;

        //verifica si el email existe en la base de datos
        db.get('SELECT * FROM usuarios WHERE email = ?', [email], async (err, usuarioALoguear) => {
            if (!usuarioALoguear) {
                return res.render('pages/login', {
                    errors: {
                        email: { msg: 'Las credenciales no coinciden con los registros' }
                    },
                    layout: false
                });
            }
            
            const contraseñaCoincide = await bcrypt.compare(password, usuarioALoguear.password_hash); //compara la contraseña ingresada con el hash almacenado en la base de datos

            //si es admin entra desde RECT
            if (contraseñaCoincide) {
                if(usuarioALoguear.rol === 'admin'){
                    const token = jwt.sign( //genera un token con la información del usuario
                        { id: usuarioALoguear.id, rol: usuarioALoguear.rol, email: usuarioALoguear.email },
                        process.env.SESSION_SECRET, //se usa para firmar el token y verificar su autenticidad
                        { expiresIn: '2h' } //el token expira en 2 horas
                    );
                    return res.json({ 
                        msg: 'Bienvenido Admin',
                        token: token, 
                        usuario: { nombre: usuarioALoguear.nombre, rol: usuarioALoguear.rol }
                    });
                }

                //si es cliente, entra desde la web Express
                req.session.usuarioLogueado = usuarioALoguear; //almacena la información del usuario en la sesión
                return res.redirect('/');
            }
            //si la contraseña es incorrecta, se renderiza la página de login con un mensaje de error
            return res.render('pages/login', {
                errors: {
                    password: { msg: 'Las credenciales no coinciden con los registros' }
                },
                oldData: req.body,
                layout: false
            });
        });
    }
};
module.exports = registroControlador;
