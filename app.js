const express = require("express");
const controlador404 = require('./src/controladores/404Controlador'); 

const app = express();
const path = require('path');
app.set("views", path.join(__dirname, "src/views"));

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false })); 
app.use(express.json());

// Ruta de fallback: Si no se encuentra la imagen en /public/img/
app.use('/img', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/img/fallback.jpg'));
});

// Importar las rutas de productos
const rutasProducto = require('./src/routes/rutasProducto');

// Usar las rutas en la aplicación
app.use('/producto', rutasProducto);

const PORT = 3000;

app.set("view engine", "ejs");

//importar ruta de registro
const rutasRegistro = require('./src/routes/rutasRegistro');
//ruta de registro
app.use('/', rutasRegistro);

//importar ruta de checkout
const rutasCheckout = require('./src/routes/rutasCheckout');
//ruta de checkout
app.use('/', rutasCheckout);



//al final de todo para que no aparezcan todas las páginas con error, se pone el middleware del error 404
app.use(controlador404.error404);

//importo el middleware del error 500
const middlewareError500 = require('./src/middlewares/error500');

// El middleware de error siempre va último para evitar problemas
app.use(middlewareError500);

app.listen(PORT, ()=> {
    console.log(`App funcionando en el puerto ${PORT}`);
})