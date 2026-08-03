const express = require('express');
const apiRouterCategoria = express.Router();
const controladorApiCategoria = require('./controladorApiCategoria'); 

apiRouterCategoria.get('/statsCategorias', controladorApiCategoria.statsCategorias); 
apiRouterCategoria.get('/categorias', controladorApiCategoria.obtenerTodos); 
apiRouterCategoria.get('/categorias/:id', controladorApiCategoria.obtenerPorId);
apiRouterCategoria.post('/categorias', controladorApiCategoria.crear);
apiRouterCategoria.put('/categorias/:id', controladorApiCategoria.actualizar);
apiRouterCategoria.delete('/categorias/:id', controladorApiCategoria.eliminar);

module.exports = apiRouterCategoria;