require('dotenv').config(); //lee el archivo .env y carga las variables de entorno en process.env
const express = require("express");
const controlador404 = require('./src/controladores/404Controlador'); //requiere el controlador
const session = require('express-session'); //requiero el paquete de sesiones para usarlo en la app


const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET, //accede a la clave secreta del archivo .env
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true }
}));

// "traductores" para que req.body funcione
app.use(express.urlencoded({ extended: true })); //"traductor" de los datos que se envian desde el formulario al servidor
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

//importar ruta de registro
const rutasRegistro = require('./src/routes/rutasRegistro');
//ruta de registro
app.use('/', rutasRegistro);

app.use('/login', (req, res) => {
    res.render('pages/login');
});

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