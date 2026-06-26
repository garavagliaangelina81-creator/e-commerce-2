const productoServicio = require('../servicios/productoServicios');

function controladorApi() {
    return {
        obtenerTodos: (req, res) => {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 8;
            productoServicio.obtenerTodos(page, limit)
                .then(productos => {
                    res.json({ 
                        data: resultado.productos,
                        paginacion: {
                            paginaActual: page,
                            limitePorPagina: limit,
                            totalProductos: resultado.total
                        }
                    });
                })
                .catch(error => {
                    res.status(500).json({ error: error.message });
                });
        }
    };
}
module.exports = controladorApi;