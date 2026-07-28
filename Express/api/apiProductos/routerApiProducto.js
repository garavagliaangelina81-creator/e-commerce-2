const express = require('express');
const productoServicio = require('../../src/servicios/productoServicios');
const productoModelo = require('../../src/modelos/productModel');

const apiRouterProducto = express.Router();

/*como la ruta POST trae una imagen, necesitamos hacer:
 Usamos una librería "multer" que "atrapa" la imagen, 
la guarda en una carpeta y nos da el nombre del archivo para que podamos guardarlo en SQLite.*/

const multer = require('multer');
const path = require('path');

// -- Configuramos dónde y cómo se guardan las imágenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    
        cb(null, 'public/img'); 
    },
    filename: function (req, file, cb) {
        // Le damos un nombre único a la imagen para que no se sobreescriban
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


apiRouterProducto.get('/statusProducto', async (req, res) => {
    const resultado = await productoServicio.obtenerTodos(1, 100);
    res.json({ data: resultado.productos, count: resultado.total });
}); // devuelve un json con todos los productos y la cantidad total de ellos

apiRouterProducto.get('/productos', async (req, res) => { // devuelve un json con los productos paginados y su cantidad total
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
apiRouterProducto.get('/productos/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        if (Number.isNaN(id) || id < 1) {
            return res.status(400).json({ error: 'El ID debe ser un número válido' });
        }

        const producto = productoModelo.buscarPorId(id);

        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json(producto);

    } catch (error) {
        console.error("Error obteniendo producto:", error);
        res.status(500).json({ error: 'Hubo un problema al obtener el producto' });
    }
});


//Agregamos 'upload.single('imagen')' como middleware.
apiRouterProducto.post('/productos', upload.single('imagen'), async (req, res) => {
    try {
        const nuevoProducto = req.body; 
        
        // El archivo viene en req.file. Si hay un archivo, guardamos su ruta.
        if (req.file) {
            nuevoProducto.imagen = `/img/${req.file.filename}`;
        }

        const resultado = await productoModelo.crearProducto(nuevoProducto);
        
        res.status(201).json(resultado);
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ error: 'Hubo un problema al crear el producto' });
    }
});

// para modificar el producto
apiRouterProducto.put('/productos/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const datosActualizados = req.body;

        if (Number.isNaN(id) || id < 1) {
            return res.status(400).json({ error: 'El ID debe ser un número válido' });
        }

        // Llamamos al servicio para actualizar
        const resultado = await productoModelo.actualizar(id, datosActualizados);
        
        if (!resultado) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        
        // Respondemos con el producto actualizado
        res.json(resultado);
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ error: 'Hubo un problema al actualizar el producto' });
    }
});


apiRouterProducto.delete('/productos/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        if (Number.isNaN(id) || id < 1) {
            return res.status(400).json({ error: 'El ID debe ser un número válido' });
        }

        // Llamamos al servicio para borrar
        await productoModelo.eliminar(id);
        
        // Respondemos con código 204 (No Content) indicando que se borró con éxito
        res.status(204).send(); 
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ error: 'Hubo un problema al eliminar el producto' });
    }
});

module.exports = apiRouterProducto;