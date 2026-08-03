const categoriaServicio = require('../../src/servicios/categoriaServicio');

const controladorApiCategoria = {
    statsCategorias: async (req, res) => {
        const resultado = await categoriaServicio.obtenerTodos(1, 100);
        res.json({ count: resultado.total });
    },

    obtenerTodos: async (req, res) => {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 8;

        if (Number.isNaN(page) || page < 1 || Number.isNaN(limit) || limit < 1) {
            return res.status(400).json({ error: 'page y limit deben ser enteros mayores o iguales a 1' });
        }

        const resultado = await categoriaServicio.obtenerTodos(page, limit);
        res.json({
            data: resultado.categorias,
            paginacion: {
                paginaActual: page,
                limitePorPagina: limit,
                totalCategorias: resultado.total
            }
        });
    },

    obtenerPorId: async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (Number.isNaN(id) || id < 1) {
                return res.status(400).json({ error: 'El ID debe ser un número válido' });
            }
            
            // buscarPorID interactua con la base de datos y por eso se usa el await
            const categoria = await categoriaServicio.buscarPorID(id); 

            if (!categoria) {
                return res.status(404).json({ error: 'Categoria no encontrada' });
            }
            res.json(categoria);
        } catch (error) {
            console.error("Error obteniendo categorias:", error);
            res.status(500).json({ error: 'Hubo un problema al obtener la categoria' });
        }
    },

    crear: async (req, res) => {
        try {
            const nuevaCategoria = req.body; 
            const resultado = await categoriaServicio.crearCategoria(nuevaCategoria);
            res.status(201).json(resultado);
        } catch (error) {
            console.error("Error al crear categoria:", error);
            res.status(500).json({ error: 'Hubo un problema al crear la categoria' });
        }
    },

    actualizar: async (req, res) => {
        try {
            const categoria_id = parseInt(req.params.id, 10);
            const datosActualizados = req.body;

            if (Number.isNaN(categoria_id) || categoria_id < 1) {
                return res.status(400).json({ error: 'El ID debe ser un número válido' });
            }

            const resultado = await categoriaServicio.actualizar(categoria_id, datosActualizados);
            
            if (!resultado) {
                return res.status(404).json({ error: 'Categoria no encontrada' });
            }
            res.json(resultado);
        } catch (error) {
            console.error("Error al actualizar categoria:", error);
            res.status(500).json({ error: 'Hubo un problema al actualizar la categoria' });
        }
    },

    eliminar: async (req, res) => {
        try {
            const categoria_id = parseInt(req.params.id, 10);

            if (Number.isNaN(categoria_id) || categoria_id < 1) {
                return res.status(400).json({ error: 'El ID debe ser un número válido' });
            }

            await categoriaServicio.eliminar(categoria_id);
            res.status(204).send(); 
        } catch (error) {
            console.error("Error al eliminar categoria:", error);
            res.status(500).json({ error: 'Hubo un problema al eliminar la categoria' });
        }
    }
    
    
};

module.exports = controladorApiCategoria;