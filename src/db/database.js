const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

//crea una nueva base de datos o si existe una, la abre
const db = new Database(path.join(__dirname, 'database.db'));

//lee el archivo donde se crean las tablas y lo ejecuta
const schemaPath = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf-8');

//ejecuta el script para crear las tablas en la base de datos
db.exec(schema);

module.exports = db;
