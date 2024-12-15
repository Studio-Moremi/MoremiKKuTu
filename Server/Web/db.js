const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'sub', 'global.json');
const { mysql: dbConfig } = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const pool = mysql.createPool({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function saveNickname(userId, nickname) {
  try {
    const query = `
      INSERT INTO users (id, nickname)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE nickname = VALUES(nickname)
    `;
    const [result] = await pool.execute(query, [userId, nickname]);
    return result;
  } catch (err) {
    console.error('MySQL Error:', err);
    throw err;
  }
}

async function isNicknameAvailable(nickname) {
  try {
    const query = `SELECT COUNT(*) AS count FROM users WHERE nickname = ?`;
    const [rows] = await pool.execute(query, [nickname]);
    return rows[0].count === 0;
  } catch (err) {
    console.error('MySQL Error:', err);
    throw err;
  }
}

module.exports = {
  pool,
  saveNickname,
  isNicknameAvailable,
};