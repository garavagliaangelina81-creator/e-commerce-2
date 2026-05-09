const productoServicio = require('../servicios/productoServicios');

const controladorProducto = {

    //para ver detalle
    detalle: (req, res) => {
        const id = req.params.id;
        const producto = productoModelo.buscarPorID(id);

        //bonus, si no existe pág 404
        if(!producto) return res.status(404).render('404');
                                     
        const relacionados = productoServicio.getRelacionados(producto);
        const categoriasBarra = productoServicio.todasCategorias();

        //enviamos el producto con los relacionados y las categorias a la vista
        res.render('pages/producto', {producto, relacionados, categoriasBarra});
    }
}

module.exports = controladorProducto;