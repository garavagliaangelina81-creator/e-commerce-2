const { body } = require("express-validator"); //se importa la libreria express-validator para hacer las validaciones necesarias a cada campo del formulario -> body es para especificar el campo

const validacionRegistro = [
    body('email')
    .trim() // limpia los espacios en blanco al inicio y al final del string
    .notEmpty().withMessage('El correo es obligatorio') //valida que el campo no este vacío
    .isEmail().withMessage('Ingresar un correo de formato válido'), //valida que el campo tenga un formato de correo electronico valido

    body('nombreU')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio'),

    body('apellido')
    .trim()
    .notEmpty().withMessage('El apellido es obligatorio'),

    body('password')
    .trim()
    .notEmpty().withMessage('La contraseña es obligatoria')
    .not().isIn(['password', '1234', 'qwerty', 'ANTOJITOS']).withMessage('La contraseña no puede ser una contraseña común').bail() //valida que la contraseña no sea una de las especificadas, con bail () se detiene la validacion si falla (esto para que no llegue al chequeo de isStrong )
    .isStrongPassword({ //valida que la contrañeña sea de una longitud específica, que contenga un numero, una mayuscula, simbolo y minuscula
        minLength: 8, 
        minLowercase: 1, 
        minUppercase: 1,
        minNumbers: 1, 
        minSymbols: 1 
    }).withMessage('La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos')
    .custom((valor, {req}) => { //valida que la contraseña no sea igual al nombre de usuario ni al email
        if(valor === req.body.nombreU || valor === req.body.email){
            throw new Error('La contraseña no puede ser el email ni el nombre de usuario')
        } else {
            return true;
        }
    }),
]
module.exports = validacionRegistro;

