const productoModelo = require('../modelos/productModel');

const productoServicio = {
    obtenerTodos: (page, limit) => {
        return productoModelo.todos(page, limit);
    },

    normalized: (id) => {
        const parsedID = parseInt(id);
        if (isNaN(parsedID)) {
            return null;
        }
        return parsedID;
    },

    buscarPorID: (id) => {
        return productoModelo.buscarPorId(id);
    },

    getRelacionados: (producto) => {
        return productoModelo.getRelacionados(producto);                                                                             
    },

    buscarCategoria: (categoria) => {
        return productoModelo.buscarCategoria(categoria);
    },

    todasCategorias: () => {
        return productoModelo.todasCategorias() || []; 
    },

    buscarPorNombre: (nombre) => {
        return productoModelo.buscarPorNombre(nombre);
    },

    getSugeridos: () => {
        return productoModelo.getSugeridos();
    },

    getDestacados: () => {
        return productoModelo.getDestacados();
    },

    ordenarPorPrecio: (criterio) => {
        return productoModelo.ordenarPorPrecio(criterio);
    },

    // MÉTODOS CRUD COMPLEMENTARIOS:
    crearProducto: (nuevoProducto) => {
        return productoModelo.crearProducto(nuevoProducto);
    },

    actualizar: (id, datosActualizados) => {
        return productoModelo.actualizar(id, datosActualizados);
    },

    eliminar: (id) => {
        return productoModelo.eliminar(id);
    }
};

module.exports = productoServicio;