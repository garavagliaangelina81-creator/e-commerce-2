const productoServicio = require('../../src/servicios/productoServicios');

const controladorApiProducto = {
    // STATUS GENERAL DE PRODUCTOS
    statsProducto: async (req, res) => {
        try {
            const resultado = await productoServicio.obtenerTodos(1, 100);
            res.json({ count: resultado.total });
        } catch (error) {
            console.error("Error obteniendo status de productos:", error);
            res.status(500).json({ error: 'Hubo un problema al obtener el status de productos' });
        }
    },

    // OBTENER TODOS LOS PRODUCTOS (PAGINADO)
    obtenerTodos: async (req, res) => {
        try {
            const page = parseInt(req.query.page, 10) || 1;
            const limit = parseInt(req.query.limit, 6) || 6;

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
        } catch (error) {
            console.error("Error obteniendo productos:", error);
            res.status(500).json({ error: 'Hubo un problema al obtener los productos' });
        }
    },

    // OBTENER PRODUCTO POR ID
    obtenerPorId: async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);

            if (Number.isNaN(id) || id < 1) {
                return res.status(400).json({ error: 'El ID debe ser un número válido' });
            }

            // Usamos await en caso de que buscarPorId sea asíncrono
            const producto = await productoServicio.buscarPorID(id);

            if (!producto) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            res.json(producto);
        } catch (error) {
            console.error("Error obteniendo producto:", error);
            res.status(500).json({ error: 'Hubo un problema al obtener el producto' });
        }
    },

    // CREAR UN NUEVO PRODUCTO
    crear: async (req, res) => {
        try {
            const nuevoProducto = req.body; 
            
            // Si el middleware de multer adjuntó una imagen, asignamos la ruta del archivo
            if (req.file) {
                nuevoProducto.imagen = `/img/${req.file.filename}`;
            }

            const resultado = await productoServicio.crearProducto(nuevoProducto);
            res.status(201).json(resultado);
        } catch (error) {
            console.error("Error al crear producto:", error);
            res.status(500).json({ error: 'Hubo un problema al crear el producto' });
        }
    },

    // ACTUALIZAR UN PRODUCTO EXISTENTE (PUT)
    actualizar: async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);

            if (Number.isNaN(id) || id < 1) {
                return res.status(400).json({ error: 'El ID debe ser un número válido' });
            }

            console.log(`---> Intentando actualizar producto #${id}`);
            console.log("Datos recibidos en req.body:", req.body);
            console.log("Archivo recibido en req.file:", req.file || "Ninguno");

            const datosActualizados = {
                nombre: req.body.nombre || "",
                descripcion: req.body.descripcion || "",
                precio: Number(req.body.precio) || 0,
                stock: Number(req.body.stock) || 0,
                categoria_id: Number(req.body.categoria_id) || null,
                imagen: req.body.imagen || ""
            };

            // Si subió una foto física nueva, reemplazamos la ruta
            if (req.file) {
                datosActualizados.imagen = `/img/${req.file.filename}`;
            }

            const resultado = await productoServicio.actualizar(id, datosActualizados);
            
            if (!resultado) {
                return res.status(404).json({ error: 'Producto no encontrado en la base de datos' });
            }
            
            res.json({ success: true, message: "Producto actualizado", data: resultado });
        } catch (error) {
            // DIAGNÓSTICO: Imprimimos el error exacto en la terminal del servidor
            console.error("ERROR CRÍTICO AL ACTUALIZAR:", error.message);
            res.status(500).json({ error: error.message });
        }
    },

    // ELIMINAR UN PRODUCTO
    eliminar: async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);

            if (Number.isNaN(id) || id < 1) {
                return res.status(400).json({ error: 'El ID debe ser un número válido' });
            }

            await productoServicio.eliminar(id);
            res.status(204).send(); 
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            res.status(500).json({ error: 'Hubo un problema al eliminar el producto' });
        }
    }
};

module.exports = controladorApiProducto;