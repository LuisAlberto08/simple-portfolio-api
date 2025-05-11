const Database = require('better-sqlite3');

// Create or open the database file
const db = new Database('db.sqlite');

// Create the projects table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    tech TEXT NOT NULL
  )
`).run();

module.exports = db;
