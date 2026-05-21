const productoModelo = require('../modelos/productModel');

const productoServicio = {
    obtenerTodos: () => {
        return productoModelo.todos();
    },
    // us17, funcion para validar el id, si no es numero devuelve null
    normalized: (id) => {
        // convertir en numero
        const parsedID = parseInt(id);
        // id: no numerico(NaN), devolvemos null
        if (isNaN(parsedID)){
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
        const categorias = productoModelo.todasCategorias();
        return categorias.map(c => c.nombre_categoria); 
    },

    buscarPorNombre: (nombre) => {
        return productoModelo.buscarPorNombre(nombre);
    },

    // funcion para elegir los 4 productos aleatorios sugeridos
    getSugeridos: () => {
        return productoModelo.getSugeridos();
    },

    // us7
    getDestacados: () => {
        return productoModelo.getDestacados();
    },

    ordenarPorPrecio: (criterio) => {
        // Recibe 'asc' o 'desc' y se lo pasa directo al modelo
        return productoModelo.ordenarPorPrecio(criterio);
    }
};

module.exports = productoServicio;