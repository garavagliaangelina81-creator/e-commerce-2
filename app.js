const express = require("express");
const controlador404 = require('./src/controladores/404Controlador'); //requiere el controlador
const session = require('express-session');

const app = express();

app.use(session({
    secret: require('./data/secreto.js'),
    httpOnly: true,
    resave: false,
    saveUninitialized: true
}));

// "traductores" para que req.body funcione
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());


const path = require('path');
app.set("views", path.join(__dirname, "src/views"));

app.use(express.static("public"));

// Ruta de fallback: Si no se encuentra la imagen en /public/img/
app.use('/img', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/img/fallback.jpg'));
});

// Importar las rutas de productos y de carrito
const rutasProducto = require('./src/routes/rutasProducto');
const rutasCarrito = require('./src/routes/rutasCarrito');

// Usar las rutas en la aplicación
app.use('/producto', rutasProducto);
app.use('/carrito', rutasCarrito);

const PORT = 3000;

app.set("view engine", "ejs");

app.listen(PORT, ()=> {
    console.log(`App funcionando en el puerto ${PORT}`);
})


//al final de todo para que no aparezcan todas las páginas con error, se pone el middleware del error 404
app.use(controlador404.error404);