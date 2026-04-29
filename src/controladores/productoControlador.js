const productoServicio = require('../modelos/productModel');

const controladorProducto = {

    //para ver detalle
    detalle: (req, res) => {
        const id = req.params.id;
        const producto = productoServicio.buscarPorID(id);

        //bonus, si no existe pág 404
        if(!producto) return res.status(404).render('error404'); //Verificar con Maia como se va a llamar la pagina del error
    
        //productos relacionados us8
        const relacionadosTodos = productoServicio.buscarCategoria(producto.categoria);

        //filtrar para no ver el mismo producto y mostrar de manera aleatoria cada vez que se llama
        const relacionados = relacionadosTodos
        .filter(p=> p.id != id)
        .sort(() => 0.5 - Math.random()) 
        .slice(0, 4);

        //enviamos el producto con los relacionados a la vista
        res.render('detalleProducto', {producto, relacionados});
    },

    //cuando se filtra por categorias
    verCategoria: (req, res) => {
        const nombreCategoria = req.params.categoria;
        const productosFiltrados = productoServicio.buscarCategoria(nombreCategoria);

        //renderizar
        res.render('/index', {productos: productosFiltrados});
    }
}

module.exports = controladorProducto;