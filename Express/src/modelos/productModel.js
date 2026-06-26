// Ahora importo la base de datos en vez del json
// Solo el modelo va a hacer las consultas a la base de datos

const db = require('../db/database.js');

const productoModelo = {
    todos: async(page, limit) => {
        const offset = (page - 1) * limit;
    try{
        //traemos solo los productos de esta pagina y traducimos las columnas para reat
       const productos = db.prepare(`
                SELECT
                    id, 
                    nombre AS name,
                    precio AS price,
                    descripcion,
                    categoria_id,
                    imagen, 
                    stock
                FROM productos
                LIMIT ? OFFSET ?
            `).all(limit, offset);
            
    const totalRow = db.prepare('SELECT COUNT(*) AS total FROM productos').get();
    return {
        productos,
        total: totalRow ? totalRow.total : 0
    };
    } catch (error) {
        throw new Error('Error al obtener los productos: ' + error.message);
    }
    },

    buscarPorId: (id) => {
        return db.prepare('SELECT * FROM productos WHERE id = ?').get(id);   // get() trae un solo resultado
    },

    buscarCategoria: (categoria_id) => {
        return db.prepare('SELECT * FROM productos WHERE categoria_id = ?').all(categoria_id);
    },

    buscarPorNombre: (nombre) => {
        // Los % le indican a SQL que puede haber texto antes o después de la consulta
        return db.prepare('SELECT * FROM productos WHERE nombre LIKE ?').all(`%${nombre}%`);
    },

    getRelacionados: (producto) => {
        return db.prepare('SELECT * FROM productos WHERE categoria_id = ? AND id != ? LIMIT 4').all(producto.categoria_id, producto.id);
    },

    getSugeridos: () => {
        return db.prepare('SELECT * FROM productos ORDER BY RANDOM() LIMIT 4').all();
    },

    // Por ahora no hay un campo "destacado" en la base de datos, así que lo simulamos al azar
    getDestacados: () => {
        return db.prepare('SELECT * FROM productos ORDER BY RANDOM() LIMIT 10').all();
    },

    todasCategorias: () => {
        return db.prepare('SELECT  * FROM categorias').all(); 
    },

    ordenarPorPrecio: (criterio = 'asc') => {
        // Usamos el operador ternario para definir el orden de forma segura en SQL
        const query = criterio === 'desc' 
            ? 'SELECT * FROM productos ORDER BY precio DESC' 
            : 'SELECT * FROM productos ORDER BY precio ASC';
            
        return db.prepare(query).all();
    },
};

module.exports = productoModelo;