const productoServicio = require('../servicios/productoServicios');

const carritoServicio = {
    agregarAlCarrito: (session, idProducto, cantidad = 1) => {

        //si no existe el carrito en la session lo creamos
        if(!session.cart)
        {
            session.cart = [];
        }

        //verificamos si ya tiene el mimso producto en el carrito
        const productoEnCarrito = session.cart.find(p => p.id == idProducto);

        if(productoEnCarrito)
        {
            productoEnCarrito.cantidad += cantidad;
        }
        else
        {
            const producto = productoServicio.buscarPorID(idProducto);
            if (producto) {
                session.cart.push({ ...producto, cantidad });
            }
        }
    },

    eliminar: (session, idProducto) => {
        if(!session.cart) return;

        session.cart = session.cart.filter(p => p.id != idProducto); //modifico la session cart sin ningun producto eliminado
    },

    sumar: (session, idProducto) => {
        const productoEnCarrito = session.cart.find(p => p.id == idProducto);
        if(productoEnCarrito) 
        {
            productoEnCarrito.cantidad ++;
        }
    },

    restar: (session, idProducto) => {
        const productoEnCarrito = session.cart.find(p => p.id == idProducto);
        if(productoEnCarrito)
        {
            productoEnCarrito.cantidad -= 1;
        }
    },

    vaciar: (session) => {
        session.cart = [];
    },

    calcularTotal: (session) => {
        if (!session.cart || session.cart.length === 0) {
            return 0;
        }
        // reduce() va sumando (precio * cantidad) de cada producto
        return session.cart.reduce((total, producto) => {
                return total + (producto.precio * producto.cantidad);
        }, 0);
    }
}

module.exports = carritoServicio;