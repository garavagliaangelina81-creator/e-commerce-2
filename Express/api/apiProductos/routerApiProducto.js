const express = require('express');
const multer = require('multer');
const path = require('path');
const controladorApiProducto = require('./controladorApiProducto'); // Asegúrate de que apunte al archivo del controlador

const apiRouterProducto = express.Router();

// CONFIGURACIÓN DE MULTER PARA IMÁGENES
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img'); 
    },
    filename: function (req, file, cb) {
        // Le damos un nombre único a la imagen para evitar sobreescrituras
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// DEFINICIÓN DE RUTAS API DE PRODUCTOS
apiRouterProducto.get('/statsProducto', controladorApiProducto.statsProducto); 
apiRouterProducto.get('/productos', controladorApiProducto.obtenerTodos); 
apiRouterProducto.get('/productos/:id', controladorApiProducto.obtenerPorId);

// En la ruta POST insertamos el middleware upload.single('imagen') antes del controlador
apiRouterProducto.post('/productos', upload.single('imagen'), controladorApiProducto.crear);

apiRouterProducto.put('/productos/:id', upload.single('imagen'), controladorApiProducto.actualizar);
apiRouterProducto.delete('/productos/:id', controladorApiProducto.eliminar);

module.exports = apiRouterProducto;