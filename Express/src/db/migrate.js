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

// Función para actualizar la tabla de forma segura
const actualizarTablaCategorias = () => {
    try {
        console.log("Verificando si es necesario actualizar la tabla 'categorias'...");
        
        db.prepare('ALTER TABLE categorias ADD COLUMN imagen TEXT').run();
        
        console.log("¡Éxito! La columna 'imagen' ha sido agregada a las categorías existentes.");
    } catch (error) {
        if (error.message.includes("duplicate column name")) {
            console.log("La columna 'imagen' ya existe. No se requieren cambios.");
        } else {
            console.error("Hubo un error al alterar la tabla:", error.message);
        }
    }
};

actualizarTablaCategorias();



module.exports = db;