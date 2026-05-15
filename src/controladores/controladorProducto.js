const productoServicio = require('../servicios/productoServicios');
const productoModelo = require('../modelos/productModel');

const controladorProducto = { 
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
        //normalizamos el id
        const idNormalizado = productoServicio.normalized(req.params.id);

        //bonus, si no existe pág 404
        if(idNormalizado === null){
         return res.status(404).send("Solicitud incorrecta : El ID del producto debe ser numero");
         
         const producto = productoServicio.buscarPorID(idNormalizado); //buscamos el producto con id ya convertido en numero
         
         //id numero pero inexistente : error 404
         if (!producto) {
            return res.status(404).render('404');
         }

        
        const relacionados = productoServicio.getRelacionados(producto);
        const categoriasBarra = productoServicio.todasCategorias();
        //enviamos el producto con los relacionados y las categorias a la vista
        res.render('pages/producto', {producto, relacionados, categoriasBarra});
    }
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
}
};



module.exports = controladorProducto;