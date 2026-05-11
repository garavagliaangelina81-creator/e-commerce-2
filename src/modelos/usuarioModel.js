const fs = require('fs');
const path = require('path');

const usuariosFilePath = path.join(__dirname, '../../data/usuarios.json');

const registroModelo = {
    todos: () => {
        const jsonData = fs.readFileSync(usuariosFilePath, 'utf-8');
        return JSON.parse(jsonData);
    },

    buscarPorEmail: (email) => {
        const usuarios = registroModelo.todos();
        return usuarios.find(u => u.email === email);
    },

    crear: (nuevoUsuario) => {
        const usuarios = registroModelo.todos();
        usuarios.push(nuevoUsuario);
        fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, ' '));
    }
};

module.exports = registroModelo;