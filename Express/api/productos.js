const express = require('express');
const productoServicio = require('../servicios/productoServicios');
const { obtenerTodos } = require('../src/servicios/productoServicios');



const apiRouter = express.Router();

apiRouter.get("/status", (req,res) => {
    const products = obtenerTodos();
    res.json({ data: products, count: products.length})
});