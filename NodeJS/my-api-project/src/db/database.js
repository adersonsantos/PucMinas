const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/items.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    }
});

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, name TEXT, description TEXT)");
});

module.exports = db;
