const productoModelo = require('../modelos/productModel');

const productoServicio = {

    buscarPorID: (id) => {
        const productos = productoModelo.todos();
        return productos.find(p => p.id == id);
    },

    getRelacionados: (producto) => {
        return productoServicio.buscarCategoria(producto.categoria)
            .filter(p=> p.id != producto.id)
            .sort(() => 0.5 - Math.random()) 
            .slice(0, 4);                                                                
    },
    
    buscarCategoria: (categoria) => {
        const productos = productoModelo.todos();
        return productos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
    },

    todasCategorias: () => {
        const categorias = productoModelo.todos().map(p => p.categoria);
        return [...new Set(categorias)];

    }
}
module.exports = productoServicio;