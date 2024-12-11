/**
* Rule the words! KKuTu Online
* Copyright (C) 2024~ Studio Moremi(op@kkutu.store)
**/
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Connect to SQLite database
const dbPath = path.join(__dirname, "database.sqlite");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Initialize tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nickname TEXT UNIQUE,
      coins INTEGER DEFAULT 0
    )
  `);
});

async function getUser(user_id) {
    const query = `SELECT user_id, nickname, mileage, experience FROM users WHERE user_id = ?`;
    const result = await db.get(query, [user_id]);
    return result || null;
  }
  
  async function updateUser(user_id, { nickname, mileage, experience }) {
    const query = `UPDATE users SET nickname = ?, mileage = ?, experience = ? WHERE user_id = ?`;
    await db.run(query, [nickname, mileage, experience, user_id]);
  }
  

module.exports = db;
