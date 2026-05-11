const productoServicio = require('../servicios/productoServicios');
const productoModelo = require('../modelos/productModel');


const controladorProducto = {
    //inicio:
    index: (req, res) => {
        const sugeridos = productoServicio.getSugeridos(); //obetenemos los 5 productos sugeridos
        const destacados = productoServicio.getDestacados(); //obtenemos los 10 productos destacados

        res.render('pages/index', {sugeridos, destacados});
    },

    //para ver detalle
    detalle: (req, res) => {
        const id = req.params.id;
        const producto = productoServicio.buscarPorID(id);

        //bonus, si no existe pág 404
        if(!producto) return res.status(404).render('404');
                                     
        const relacionados = productoServicio.getRelacionados(producto);
        const categoriasBarra = productoServicio.todasCategorias();

        //enviamos el producto con los relacionados y las categorias a la vista
        res.render('pages/producto', {producto, relacionados, categoriasBarra});
    }
}

module.exports = controladorProducto;