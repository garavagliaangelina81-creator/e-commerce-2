const fs = require('fs');
const path = require('path');

const db = require('./database');

const rutaJson = path.join(__dirname, '../../data/productos.json');
const rutaCategoriasJson = path.join(__dirname, '../../data/categorias.json');
const productosJson = JSON.parse(fs.readFileSync(rutaJson, 'utf-8'));
const categoriasJson = JSON.parse(fs.readFileSync(rutaCategoriasJson, 'utf-8'));

console.log("Iniciando migración de datos");

const insertarProductos = db.prepare(`
    INSERT OR IGNORE INTO productos 
    (id, nombre, precio, descripcion, imagen, stock, categoria_id) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?)`
);

const insertarCategorias = db.prepare(`
    INSERT OR IGNORE INTO categorias 
    (categoria_id, nombre_categoria) 
    VALUES 
    (?, ?)`
);

    const migracion = db.transaction((productos) => {
        for (const producto of productos) {
            insertarProductos.run(
                producto.id,
                producto.nombre,
                producto.precio,
                producto.descripcion,
                producto.imagen,
                producto.stock,
                producto.categoria_id
            );
        }
    });

const migracionCategorias = db.transaction((categorias) => {
    for (const categoria of categorias) {
        insertarCategorias.run(
            categoria.id,
            categoria.nombre_categoria
        );
    }
});

try {
    migracionCategorias(categoriasJson);
    migracion(productosJson);
    console.log("Migración de datos completada");
} catch (error) {
    console.error("Error durante la migración de datos:", error);
}
module.exports = db;