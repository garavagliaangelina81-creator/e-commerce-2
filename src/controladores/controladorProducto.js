const productoServicio = require('../servicios/productoServicios');
const productoModelo = require('../modelos/productModel');

const controladorProducto = { 
    //inicio:
    //index: (req, res) => {
       // const sugeridos = productoServicio.getSugeridos(); //obetenemos los 5 productos sugeridos
       // const destacados = productoServicio.getDestacados(); //obtenemos los 10 productos destacados

       // res.render('pages/index', {sugeridos, destacados});
       index: (req, res) => {
    try {
        //Intentamos obtener los datos del servicio
        const sugeridos = productoServicio.getSugeridos() || []; 
        const destacados = productoServicio.getDestacados() || [];
        const categoriasBarra = productoServicio.todasCategorias() || [];

        //renderizamos la página pasando siempre las variables (aunque estén vacías)
        res.render('pages/index', { 
            sugeridos, 
            destacados,
            categoriasBarra,
            esBusqueda: false 
        });
    } catch (error) {
        console.error("Error en el index:", error);
        //Si algo falla, mandamos listas vacías para que la página no de error 500
        res.render('pages/index', { sugeridos: [], destacados: [],categoriasBarra: [], esBusqueda: false });
    }

},

    //para ver detalle
    detalle: (req, res) => {
        const id = req.params.id;
        const producto = productoServicio.buscarPorID(id);

        //bonus, si no existe pág 404
        if(!producto) return res.status(404).render('pages/404');
        
        const relacionados = productoServicio.getRelacionados(producto);
        const categoriasBarra = productoServicio.todasCategorias();
        //enviamos el producto con los relacionados y las categorias a la vista
        res.render('pages/producto', {producto, relacionados, categoriasBarra});
    },
    //US19: funcion de buscar en el header
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
            })
        }
    }
};



module.exports = controladorProducto;