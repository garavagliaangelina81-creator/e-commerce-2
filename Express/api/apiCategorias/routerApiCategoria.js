const express = require('express');
const apiRouterCategoria = express.Router();
const controladorApiCategoria = require('./controladorApiCategoria'); 
const multer = require('multer');
// Importamos el módulo nativo de Node.js para manejar rutas y extensiones
const path = require('path'); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img'); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

apiRouterCategoria.get('/statsCategorias', controladorApiCategoria.statsCategorias); 
apiRouterCategoria.get('/categorias', controladorApiCategoria.obtenerTodos); 
apiRouterCategoria.get('/categorias/:id', controladorApiCategoria.obtenerPorId);
apiRouterCategoria.post('/categorias', upload.single('imagen'), controladorApiCategoria.crear);
apiRouterCategoria.put('/categorias/:id', controladorApiCategoria.actualizar);
apiRouterCategoria.delete('/categorias/:id', controladorApiCategoria.eliminar);

module.exports = apiRouterCategoria;