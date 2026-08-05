const autenticacionMiddleware = (req, res, next) => {
    // verificamos si el usuario está logueado verificando si existe la propiedad "usuarioLogueado" en la sesión
    if (req.session && req.session.usuarioLogueado) {
        return next();
    }
    
    // Si no existe, lo redirigimos a la página de login
    return res.redirect('/login');
};

module.exports = autenticacionMiddleware;