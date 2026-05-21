const productoServicio = require('../servicios/productoServicios');

const carritoServicio = {
    inicializar: (session) => {
        if (!session.cart) {
            session.cart = [];
        }
    },
    agregarAlCarrito: (session, idProducto) => {
        carritoServicio.inicializar(session);

        //validar que el producto existe en la base sqlite
        const productoOriginal = productoServicio.buscarPorID(parseInt(idProducto));
        if (!productoOriginal){
            throw new Error('El producto no existe en la base de datos.');

        }
        
        // Buscamos si el producto ya está en el carrito
        const existe = session.cart.find(p => p.id == idProducto);
        
        if (existe) {
            existe.cantidad += 1;
            //aseguramos que el precio se mantega real desde la base de datos
            existe.precio = productoOriginal.precio;
        } else { //nose guarda informacion sensible en la sesion, solo lo basico para la vista
            // el precio real viene directo de sqlite
                session.cart.push({
                    id: productoOriginal.id,
                    nombre: productoOriginal.nombre,
                    precio: productoOriginal.precio,
                    imagen: productoOriginal.imagen,
                    cantidad: 1
                });
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
        { // por seguridad, refrescamos el precio real desde la base antes de sumar
            const productoOriginal = productoServicio.buscarPorID(parseInt(idProducto));
            if (productoOriginal) {
                productoEnCarrito.precio = productoOriginal.precio;
            }
            productoEnCarrito.cantidad ++;
        }
    },

    restar: (session, idProducto) => {
        const productoEnCarrito = session.cart.find(p => p.id == idProducto);
        if(productoEnCarrito){ 
            //refrescamos precio real
            const productoOriginal = productoServicio.buscarPorID(parseInt(idProducto));
            if (productoOriginal){ 
                productoEnCarrito.precio = productoOriginal.precio;
            }
                productoEnCarrito.cantidad -= 1;
            } else {
                // Si la cantidad es 1, eliminamos el producto del carrito
                carritoServicio.eliminar(session, idProducto);
            }
    },

    vaciar: (session) => {
    session.cart = [];
}, 
// calcular totales usando datos reales
calcularTotal: (session) => { // ¡Ahora sí es una propiedad limpia del objeto!
        if (!session.cart || session.cart.length === 0) {
            return 0;
        }
        // reduce() va sumando (precio * cantidad) de cada producto
        return session.cart.reduce((total, producto) => {
            //buscamos el producto en sqlite en cada vuelta del bucle para garantizar que el precio es el real
            const productoOriginal = productoServicio.buscarPorID(producto.id);
            const precioReal = productoOriginal ? productoOriginal.precio : producto.precio;
             
            //forzamos a actualizar el objeto de la sesion con el precio real manipulado
            producto.precio = precioReal;
                return total + (producto.precio * producto.cantidad);
        }, 0);
    },

    calcularCantidad: (session) => { // calcula la cantidad total de productos en el carrito
        if (!session.cart || session.cart.length === 0) {
            return 0;
        }
        return session.cart.reduce((cantidad, producto) => cantidad + producto.cantidad, 0);
    }
};

module.exports = carritoServicio;