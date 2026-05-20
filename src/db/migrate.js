const fs = require('fs');
const path = require('path');

const db = require('./database');

const rutaJson = path.join(__dirname, '../../data/productos.json');
const productosJson = JSON.parse(fs.readFileSync(rutaJson, 'utf-8'));

console.log("Iniciando migración de datos");

const insertarProductos = db.prepare(`
    INSERT OR IGNORE INTO productos 
    (id, nombre, precio, descripcion, imagen, stock) 
    VALUES 
    (?, ?, ?, ?, ?, ?)`
);

    const migracion = db.transaction((productos) => {
        for (const producto of productos) {
            insertarProductos.run(
                producto.id,
                producto.nombre,
                producto.precio,
                producto.descripcion,
                producto.imagen,
                producto.stock
            );
        }
    });

try {
    migracion(productosJson);
    console.log("Migración de datos completada");
} catch (error) {
    console.error("Error durante la migración de datos:", error);
}
module.exports = db;