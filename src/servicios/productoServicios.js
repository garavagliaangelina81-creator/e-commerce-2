const productModel = require('../modelos/productModel');

const productoServicio = {

    getDetalle: (id)  => {
        return productModel.buscarPorID(id);
    },

    getRelacionados: (producto) => {
        return productoModelo.buscarCategoria(producto.categoria)
                                                                .filter(p=> p.id != id)
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