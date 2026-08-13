const db = require('../db/database')

const ModeloUsuario = {
    // esta funcion solo busca en la base de datos
    buscarPorEmail: (email) => {
        const stmtBuscar = db.prepare('SELECT * FROM usuarios WHERE email = ?');
        return stmtBuscar.get(email); // Retorna el usuario o undefined si no existe
    }
};

module.exports = ModeloUsuario;