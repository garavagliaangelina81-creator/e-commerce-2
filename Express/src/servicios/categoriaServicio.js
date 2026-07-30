const categoriaModelo = require('../modelos/categoriaModel.js');

const categoriaServicio = {
    obtenerTodos: (page, limit) => {
        return categoriaModelo.todos(page, limit);
    },
    normalized: (categoria_id) => {
        // convertir en numero
        const parsedID = parseInt(categoria_id);
        // id: no numerico(NaN), devolvemos null
        if (isNaN(parsedID)){
            return null;
        }
        return parsedID;
    },

    buscarPorID: (categoria_id) => {
        return categoriaModelo.buscarPorId(categoria_id);
    },

    buscarPorNombre: (nombre_categoria) => {
        return categoriaModelo.buscarPorNombre(nombre_categoria);
    },

    ordenarPorNombre: (criterio) => {
        // Recibe 'asc' o 'desc' y se lo pasa directo al modelo
        return categoriaModelo.ordenarPorNombre(criterio);
    },

    // crear una nueva categoria
    crearCategoria: (nuevaCategoria) => {
        return categoriaModelo.crearCategoria(nuevaCategoria);
    },

    // modificar una categoria
    actualizar: (categoria_id, categoriaActualizada) => {
        return categoriaModelo.actualizar(categoria_id, categoriaActualizada);
    },

    // eliminar una categoria
    eliminar: (categoria_id) => {
        return categoriaModelo.eliminar(categoria_id);
    }

};

module.exports = categoriaServicio;