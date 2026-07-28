// Solo el modelo va a hacer las consultas a la base de datos
const db = require('../db/database.js');

const categoriaModelo = {
    todos: async(page, limit) => {
        const offset = (page - 1) * limit;
    try{
        //traemos solo las categorias de esta pagina y traducimos las columnas para react
        const categorias = db.prepare(`
                SELECT
                    categoria_id,
                    nombre_categoria
                FROM categorias
                LIMIT ? OFFSET ?
            `).all(limit, offset);
            
    const totalRow = db.prepare('SELECT COUNT(*) AS total FROM categorias').get();
    return {
        categorias,
        total: totalRow ? totalRow.total : 0
    };
    } catch (error) {
        throw new Error('Error al obtener las categorias: ' + error.message);
    }
    },

    buscarPorId: (categoria_id) => {
        return db.prepare('SELECT * FROM categorias WHERE categoria_id = ?').get(categoria_id);   // get() trae un solo resultado
    },

    buscarPorNombre: (nombre_categoria) => {
        // Los % le indican a SQL que puede haber texto antes o después de la consulta
        return db.prepare('SELECT * FROM categorias WHERE nombre_categoria LIKE ?').all(`%${nombre_categoria}%`);
    },

    ordenarPorNombre: (criterio = 'asc') => {
        // Usamos el operador ternario para definir el orden de forma segura en SQL
        const query = criterio === 'desc' 
            ? 'SELECT * FROM categorias ORDER BY nombre_categoria DESC' 
            : 'SELECT * FROM categorias ORDER BY nombre_categoria ASC';
            
        return db.prepare(query).all();
    },

    //Para crear una nueva categoria
    crearCategoria: (nuevaCategoria) => {
        const { nombre_categoria } = nuevaCategoria;
        const stmt = db.prepare(`
            INSERT INTO categorias (nombre_categoria)
            VALUES (?)
        `);
        const info = stmt.run(nombre_categoria);
        return { categoria_id: info.lastInsertRowid, ...nuevaCategoria};
    },

    // modificar una categoria
    actualizar: (categoria_id, categoriaActualizada) => {
        const { nombre_categoria } = categoriaActualizada;
        const stmt = db.prepare(`
            UPDATE categorias 
            SET nombre_categoria = ?
            WHERE categoria_id = ?
        `);
        // Ejecutamos el update pasando los nuevos valores y finalmente el id
        const info = stmt.run(nombre_categoria, categoria_id);
        
        // Retornamos true si se modificó al menos una fila
        return info.changes > 0;
    },

    // eliminar una categoria
    eliminar: (categoria_id) => {
        const stmt = db.prepare(`DELETE FROM categorias WHERE categoria_id = ?`);
        const info = stmt.run(categoria_id);
        
        // Retornamos true si se eliminó correctamente
        return info.changes > 0;
    }
};

module.exports = categoriaModelo;