const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../../data/productos.json');

const productoModelo = {
    todos: () => {
        const jsonData = fs.readFileSync(productsFilePath, 'utf-8');
        return JSON.parse(jsonData); //convertimos en objeto
    }
};

module.exports = productoModelo;