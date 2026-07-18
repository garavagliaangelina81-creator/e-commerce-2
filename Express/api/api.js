const productoServicio = require('../servicios/productoServicios');

function controladorApi() {
    return {
        obtenerTodos: (req, res) => {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 8            
            if (Number.isNaN(page) || page < 1) {
                return res.status(400).json({ error: 'page debe ser entero mayor o igual a 1' });
            };
            productoServicio.obtenerTodos(page, limit) // responde con un JSON que contiene los productos y la informacion de paginacion
                .then(resultado => {
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