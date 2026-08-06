const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const localDbPath = path.join(__dirname, 'database.db');
const preferredDbPath = process.env.DB_PATH
    || process.env.DATABASE_PATH
    || (process.env.RAILWAY_VOLUME_MOUNT_PATH
        ? path.join(process.env.RAILWAY_VOLUME_MOUNT_PATH, 'database.db')
        : localDbPath);

const dbDir = path.dirname(preferredDbPath);
fs.mkdirSync(dbDir, { recursive: true });

if (preferredDbPath !== localDbPath && !fs.existsSync(preferredDbPath) && fs.existsSync(localDbPath)) {
    fs.copyFileSync(localDbPath, preferredDbPath);
    console.log(`[sqlite] copied local database to ${preferredDbPath}`);
}

console.log(`[sqlite] using database at ${preferredDbPath}`);

const db = new Database(preferredDbPath);

const schemaPath = path.join(__dirname, 'schema.sql');
if (fs.existsSync(schemaPath)) {
    const schema = fs.readFileSync(schemaPath, 'utf-8');
    db.exec(schema);
}

const userCount = db.prepare('SELECT COUNT(*) AS count FROM usuarios').get()?.count || 0;
console.log(`[sqlite] usuarios in database: ${userCount}`);

module.exports = db;