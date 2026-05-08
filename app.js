const express = require("express");

const app = express();

const path = require('path');
app.set("views", path.join(__dirname, "src/views"));

app.use(express.static("public"));

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

app.listen(PORT, ()=> {
    console.log(`App funcionando en el puerto ${PORT}`);
})
