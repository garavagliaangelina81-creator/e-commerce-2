const express = require("express");

const app = express();
const router = express.Router();

app.use(express.static("public"));

const PORT = 3000;

app.set("view engine", "ejs");

app.listen(PORT, ()=> {
    console.log(`App funcionando en el puerto ${PORT}`);
})
