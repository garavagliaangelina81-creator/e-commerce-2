const productoServicio = require('../servicios/productoServicios');

const controladorProducto = { 
    index: (req, res) => {
        try {
            // us18: capturamos el criterio ordenamiento de la URL (?sort=asc)
            const criterioOrden = req.query.sort;
            
            let todos = [];

            // us18: Si el usuario elige ordenar, le pedimos al servicio la lista ordenada por SQL
            if (criterioOrden === 'asc' || criterioOrden === 'desc') {
                todos = productoServicio.ordenarPorPrecio(criterioOrden);
            } else {
                // Si no hay orden, traemos todos normalmente a través del SERVICIO
                todos = productoServicio.obtenerTodos() || [];
            }

            // Intentamos obtener el resto de los datos del servicio
            const sugeridos = productoServicio.getSugeridos() || []; 
            const destacados = productoServicio.getDestacados() || [];
            const categoriasBarra = productoServicio.todasCategorias() || [];

            // renderizamos la página pasando siempre las variables (aunque estén vacías)
            res.render('pages/index', { 
                todos,
                sugeridos, 
                destacados,
                categoriasBarra,
                esBusqueda: false 
            });
        } catch (error) {
            console.error("Error en index:", error);
            // Si algo falla, mandamos listas vacías para que la página no de error 500
            res.render('pages/index', { 
                todos: [],
                sugeridos: [], 
                destacados: [],
                categoriasBarra: [], 
                esBusqueda: false 
            });
        }
    },

verCategoria: (req, res) => {
    const categoriaId = parseInt(req.params.categoria);
    
    const productosFiltrados = productoServicio.buscarCategoria(categoriaId);
    
    const categoriasBarra = productoServicio.todasCategorias(); 
    const sugeridos = productoServicio.getSugeridos() || []; 
    const destacados = productoServicio.getDestacados() || [];
    const todos = productoServicio.obtenerTodos() || [];

    
    const categoriaEncontrada = categoriasBarra.find(c => c.categoria_id === categoriaId);
    const nombreCategoriaActual = categoriaEncontrada ? categoriaEncontrada.nombre_categoria : "Categoría";

    res.render('pages/index', { 
            todos,
            productos: productosFiltrados, 
            categoriasBarra, 
            sugeridos, 
            destacados, 
            esBusqueda: false, 
            esCategoria: true, 
            categoriaActual: nombreCategoriaActual 
    });
    },

    // para ver detalle
    detalle: (req, res, next) => {
        // normalizamos el id
        const idNormalizado = productoServicio.normalized(req.params.id);

        // bonus, si no es número, pasamos al siguiente middleware
        if(idNormalizado === null){
            return next();
        }
        
        const producto = productoServicio.buscarPorID(idNormalizado); 
        if (!producto) {
            return res.status(404).render('pages/404');
        }

        const relacionados = productoServicio.getRelacionados(producto);
        const categoriasBarra = productoServicio.todasCategorias();
        
        res.render('pages/producto', {
            producto, 
            relacionados, 
            categoriasBarra
        });
    },

    buscar: (req, res) => {
        const busquedaUsuario = req.query.consulta;
        const resultados = productoServicio.buscarPorNombre(busquedaUsuario);
        const categoriasBarra = productoServicio.todasCategorias();

        if (resultados.length > 0){
            res.render('pages/index', {
                sugeridos: resultados,
                categoriasBarra: categoriasBarra, 
                destacados: [],
                esBusqueda: true
            });
        } else {
            res.render('pages/index', {
                sugeridos: [],
                categoriasBarra: categoriasBarra, 
                destacados: [],
                esBusqueda: true,
                mensaje: 'No se encontraron productos que coincidan con tu búsqueda'
            });
        }
    }
};

module.exports = controladorProducto;