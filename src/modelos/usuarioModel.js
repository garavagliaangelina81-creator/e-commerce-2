const fs = require('fs');
const path = require('path');

const usuariosFilePath = path.join(__dirname, '../../data/usuarios.json');

const usuarioModelo = {
    todos: () => {
        const jsonData = fs.readFileSync(usuariosFilePath, 'utf-8');
        return JSON.parse(jsonData);
    },

    buscarPorEmail: (email) => {
        const todos = usuarioModelo.todos();
        return todos.find(u => u.email === email);
    },

    crear: (nuevoUsuario) => {
        const todos = usuarioModelo.todos();
        todos.push(nuevoUsuario);
        fs.writeFileSync(usuariosFilePath, JSON.stringify(todos, null, ' '));
    }
};

module.exports = usuarioModelo;