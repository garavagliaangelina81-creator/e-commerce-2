const productoModelo = require('../modelos/productModel');
const carritoServicio = require('../servicios/carritoServicio');

const carritoControlador = {
    agregar: (req, res) =>
    {
        const idProducto = req.body.idProducto;
        
        // Verificar que el producto existe en la base de datos
        const existe = productoModelo.buscarPorId(parseInt(idProducto, 10));
        if (!existe) return res.status(404).render('pages/404');

        // Si existe, llamo al servicio para que se comunique con la session
        carritoServicio.agregarAlCarrito(req.session, idProducto);

        res.redirect('/carrito');
    },

    verCarrito: (req, res) => {
        //obtenemos los productos de la session
        const productos = req.session.cart || []; 

        //obtenemos el total
        const total = carritoServicio.calcularTotal(req.session);

        res.render('pages/carrito', {productos, total});
    },

    sumar: (req, res) => {
        const idProducto = req.params.id;
        carritoServicio.sumar(req.session, idProducto);
        res.redirect('/carrito');
    },

    restar: (req, res) => {
        const idProducto = req.params.id;
        carritoServicio.restar(req.session, idProducto);
        res.redirect('/carrito');
    },

    eliminar: (req, res) => {
        const idProducto = req.params.id;
        carritoServicio.eliminar(req.session, idProducto);
        res.redirect('/carrito');
    },

    vaciar: (req, res) => {
        carritoServicio.vaciar(req.session);
        res.redirect('/carrito');
    },
    mostrar: (req, res) => {
    
    if (!req.session.cart) {
        req.session.cart = [];
    }
    const productos = req.session.cart;
    const total = carritoServicio.calcularTotal(req.session);

    res.render('pages/carrito', { productos, total });
}
}

module.exports = carritoControlador;