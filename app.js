const express = require("express");

const app = express();

// Importar las rutas de productos
const rutasProducto = require('./routes/rutasProducto');

// Usar las rutas en la aplicación
app.use('/', rutasProducto);

app.use(express.static("public"));

const PORT = 3000;

app.set("view engine", "ejs");

app.listen(PORT, ()=> {
    console.log(`App funcionando en el puerto ${PORT}`);
})
