const db = require('../db/database')

const ModeloUsuario = {
    // Esta función se encarga exclusivamente de buscar en la BD
    buscarPorEmail: (email) => {
        const stmtBuscar = db.prepare('SELECT * FROM usuarios WHERE email = ?');
        return stmtBuscar.get(email); // Retorna el usuario o undefined si no existe
    }
};

module.exports = ModeloUsuario;