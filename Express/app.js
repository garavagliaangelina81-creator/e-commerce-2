require('dotenv').config(); 
require('./src/db/database'); //para ejecutar el codigo de la base de datos y crearlas

const express = require("express");
const cors = require('cors'); 
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session'); //requiero el paquete de sesiones para usarlo en la app

const rutasRegistro = require('./src/routes/rutasRegistro');
const rutasProducto = require('./src/routes/rutasProducto');
const rutasCarrito = require('./src/routes/rutasCarrito');
const rutasCheckout = require('./src/routes/rutasCheckout');
const carritoCantidadMiddleware = require('./src/middlewares/carritoCantidad');
const controlador404 = require('./src/controladores/404Controlador'); //requiere el controlador 404
const middlewareError500 = require('./src/middlewares/error500');

const app = express();
app.use(cors());

const PORT = 3000;

app.use(session({
    secret: process.env.SESSION_SECRET || 'clavesecreta', 
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true }
}));
// "traductores" para que req.body funcione
app.use(express.urlencoded({ extended: true })); //"traductor" de los datos que se envian desde el formulario al servidor
app.use(express.json());


const path = require('path');
app.set("views", path.join(__dirname, "src/views"));


app.set("view engine", "ejs");
// 
app.use(expressLayouts);
app.set('layout', 'layouts/main')

//app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));

app.use(carritoCantidadMiddleware);

app.get('/ofertas', (req, res) => {
    res.render('pages/ofertas');
});

// Ruta de fallback: Si no se encuentra la imagen en /public/img/
app.use('/img', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/img/fallback.jpg'));
});

//rutas estáticas
app.use('/carrito', rutasCarrito);

app.use('/', rutasRegistro);

app.use('/', rutasCheckout);

//rutas dinamicas (siempre al final para que no tome las rutas anteriores como id)
app.use('/producto', rutasProducto);

app.use('/', rutasProducto);


// El middleware de error siempre va último para evitar problemas
app.use(middlewareError500);

//al final de todo para que no aparezcan todas las páginas con error, se pone el middleware del error 404
app.use(controlador404.error404);

app.listen(PORT, ()=> {
    console.log(`App funcionando en el puerto ${PORT}`);
})