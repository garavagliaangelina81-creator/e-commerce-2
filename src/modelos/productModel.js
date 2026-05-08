const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

//objeto literal
const productoServicio = {
    todos: () => {
        const jsonData = fs.readFileSync(productsFilePath, 'utf-8');
        return JSON.parse(jsonData); //convertimos en objeto
    },

    buscarPorID: (id) => {
        const productos = productoServicio.todos();
        return productos.find(p => p.id == id);
    },

    buscarCategoria: (categoria) => {
        const productos = productoServicio.todos();
        return productos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
    }
};

module.exports = productoServicio;