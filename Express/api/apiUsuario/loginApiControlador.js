const ModeloUsuario = require('../../src/modelos/usuarioModelo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const loginControlador = {

    loginApi: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() });
        }

        const { email, password } = req.body;

        try {
            const usuarioALoguear = ModeloUsuario.buscarPorEmail(email);

            if (!usuarioALoguear) {
                return res.status(401).json({ msg: 'Las credenciales no coinciden con los registros' });
            }
            
            const contraseñaCoincide = await bcrypt.compare(password, usuarioALoguear.password_hash);

            if (!contraseñaCoincide) {
                return res.status(401).json({ msg: 'Las credenciales no coinciden con los registros' });
            }

            if (usuarioALoguear.rol !== 'admin') {
                return res.status(403).json({ msg: 'Acceso denegado. Se requieren permisos de administrador.' });
            }

            const token = jwt.sign(
                { id: usuarioALoguear.id, rol: usuarioALoguear.rol, email: usuarioALoguear.email },
                process.env.SESSION_SECRET,
                { expiresIn: '2h' }
            );

            return res.status(200).json({ 
                msg: 'Bienvenido Admin',
                token: token, 
                usuario: { nombre: usuarioALoguear.nombre, rol: usuarioALoguear.rol }
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json({ msg: 'Error interno del servidor' });
        }
    }
};

module.exports = loginControlador;