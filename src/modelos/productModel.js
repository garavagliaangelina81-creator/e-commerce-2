const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../../data/productos.json');

//objeto literal
const productoModelo = {
    todos: () => {
        const jsonData = fs.readFileSync(productsFilePath, 'utf-8');
        return JSON.parse(jsonData); //convertimos en objeto
    },

    buscarPorID: (id) => {
        const productos = productoModelo.todos();
        return productos.find(p => p.id == id);
    }
};

module.exports = productoModelo;