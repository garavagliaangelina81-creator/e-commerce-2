const productoServicio = require('../servicios/productoServicios');

const carritoServicio = {
    inicializar: (session) => {
        if (!session.cart) {
            session.cart = [];
        }
    },
    agregarAlCarrito: (session, idProducto) => {
        carritoServicio.inicializar(session);
        
        // Buscamos si el producto ya está en el carrito
        const existe = session.cart.find(p => p.id == idProducto);
        
        if (existe) {
            existe.cantidad += 1;
        } else {
            const productoOriginal = productoServicio.buscarPorID(parseInt(idProducto));
            if (productoOriginal) {
                session.cart.push({
                    id: productoOriginal.id,
                    nombre: productoOriginal.nombre,
                    precio: productoOriginal.precio,
                    imagen: productoOriginal.imagen,
                    cantidad: 1
                });
            }
        }
    },

    eliminar: (session, idProducto) => {
        if(session.cart){
            session.cart = session.cart.filter(p => p.id != idProducto);
        }
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
        if(productoEnCarrito){ 
            if (productoEnCarrito.cantidad > 1) {
                productoEnCarrito.cantidad -= 1;
            } else {
                // Si la cantidad es 1, eliminamos el producto del carrito
                carritoServicio.eliminar(session, idProducto);
            }
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
    },

    calcularCantidad: (session) => { // calcula la cantidad total de productos en el carrito
        if (!session.cart || session.cart.length === 0) {
            return 0;
        }
        return session.cart.reduce((cantidad, producto) => cantidad + producto.cantidad, 0);
    }
}

module.exports = carritoServicio;