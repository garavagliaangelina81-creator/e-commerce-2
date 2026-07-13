const express = require('express');
const productoServicio = require('../src/servicios/productoServicios');

const apiRouter = express.Router();

apiRouter.get('/status', async (req, res) => {
    const resultado = await productoServicio.obtenerTodos(1, 100);
    res.json({ data: resultado.productos, count: resultado.total });
}); // devuelve un json con todos los productos y la cantidad total de ellos

apiRouter.get('/productos', async (req, res) => { // devuelve un json con los productos paginados y su cantidad total
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 8;

    if (Number.isNaN(page) || page < 1 || Number.isNaN(limit) || limit < 1) {
        return res.status(400).json({ error: 'page y limit deben ser enteros mayores o iguales a 1' });
    }

    const resultado = await productoServicio.obtenerTodos(page, limit);
    res.json({
        data: resultado.productos,
        paginacion: {
            paginaActual: page,
            limitePorPagina: limit,
            totalProductos: resultado.total
        }
    });
});

module.exports = apiRouter;