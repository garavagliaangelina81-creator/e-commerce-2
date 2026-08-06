const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// definimos la ruta de tu base de datos local
const localDbPath = path.join(__dirname, 'database.db');

// definimos la ruta de la base de datos en railway o en local si no estamos en railway
const dbPath = process.env.DB_PATH || localDbPath;

//si el archivo de la base de datos no existe en Railway pero sí en local, lo copiamos para no perder los datos
if (process.env.DB_PATH && !fs.existsSync(dbPath) && fs.existsSync(localDbPath)) {
    fs.copyFileSync(localDbPath, dbPath);
    console.log('¡Base de datos local copiada al volumen de Railway con éxito!');
}

// conectamos a la base de datos (la de la nube o la local)
const db = new Database(dbPath);

// se ejecuta el archivo schema.sql
const schemaPath = path.join(__dirname, 'schema.sql');
if (fs.existsSync(schemaPath)) {
    const schema = fs.readFileSync(schemaPath, 'utf-8');
    db.exec(schema);
}

module.exports = db;