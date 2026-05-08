const productoServicio = require('../modelos/productModel');

const controladorProducto = {

    //para ver detalle
    detalle: (req, res) => {
        const id = req.params.id;
        const producto = productoServicio.buscarPorID(id);

        //bonus, si no existe pág 404
//        if(!producto) return res.status(404).render('error404'); //Verificar con Maia como se va a llamar la pagina del error
    
        //productos relacionados us8
        const relacionados = productoServicio.buscarCategoria(producto.categoria)
                                                                                .filter(p=> p.id != id)
                                                                                .sort(() => 0.5 - Math.random()) 
                                                                                .slice(0, 4);
                                     
        const categoriasBarra = productoServicio.todasCategorias();

        //enviamos el producto con los relacionados y las categorias a la vista
        res.render('pages/producto', {producto, relacionados, categoriasBarra});
    },

    //cuando se filtra por categorias   NO VA ACÁ
    verCategoria: (req, res) => {
        const nombreCategoria = req.params.categoria;
        const productosFiltrados = productoServicio.buscarCategoria(nombreCategoria);

        //renderizar
        res.render('index', {producto: productosFiltrados});
    }
}

module.exports = controladorProducto;