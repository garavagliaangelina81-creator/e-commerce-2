//middleware error 500
const controlador500 = require('../controladores/500Controlador');

const middlewareError500 = (err, req, res, next) => {
    // este error solo va a salir en nuestra consola
    console.error(err.stack); 
    
    // muestra la vista del error 500 al usuario
    controlador500.error500(req, res, {layout: false}); 
};

module.exports = middlewareError500;