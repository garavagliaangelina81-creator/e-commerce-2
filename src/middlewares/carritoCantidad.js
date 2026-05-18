const carritoServicio = require('../servicios/carritoServicio');

module.exports = (req, res, next) => {
    res.locals.carritoCantidad = carritoServicio.calcularCantidad(req.session);
    next();
};
