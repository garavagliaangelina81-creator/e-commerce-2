const { body } = require("express-validator"); //se importa la libreria express-validator para hacer las validaciones necesarias a cada campo del formulario -> body es para especificar el campo

const validacionRegistro = [
    body('email')
    .trim()
    .notEmpty().withMessage('El correo es obligatorio')
    .isEmail().withMessage('Ingresar un correo de formato válido'),

    body('nombreU')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio'),

    body('apellido')
    .trim()
    .notEmpty().withMessage('El apellido es obligatorio'),

    body('password')
    .trim()
    .notEmpty().withMessage('La contraseña es obligatoria')
    .not().isIn(['password', '1234', 'qwerty', 'ANTOJITOS']).withMessage('La contraseña no puede ser una contraseña común').bail()
    .isStrongPassword({
        minLength: 8, //8 caracteres minimo
        minLowercase: 1, // una minúscula
        minUppercase: 1, // una mayúscula
        minNumbers: 1, // minimo un numero
        minSymbols: 1 // minimo un simbolo especial
    }).withMessage('La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos')
    .custom((valor, {req}) => {
        if(valor === req.body.nombreU || valor === req.body.email){
            throw new Error('La contraseña no puede ser el email ni el nombre de usuario')
        } else {
            return true;
        }
    }),
]
module.exports = validacionRegistro;

