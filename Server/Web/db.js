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

/**
 * @param {string} userId
 * @returns {Promise<number>}
 */
async function getUserLevel(userId) {
  try {
    const [rows] = await pool.query('SELECT level FROM users WHERE discord_id = ?', [userId]);
    if (rows.length === 0) {
      return 1;
    }
    return rows[0].level;
  } catch (err) {
    console.error('MySQL Error (getUserLevel):', err);
    throw err;
  }
}

/**
 * 닉네임 저장
 * @param {string} userId
 * @param {string} nickname
 * @returns {Promise<object>}
 */
async function saveNickname(userId, nickname) {
  try {
    const query = `
      INSERT INTO users (discord_id, nickname)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE nickname = VALUES(nickname)
    `;
    const [result] = await pool.execute(query, [userId, nickname]);
    return result;
  } catch (err) {
    console.error('MySQL Error (saveNickname):', err);
    throw err;
  }
}

/**
 * @param {string} nickname
 * @returns {Promise<boolean>}
 */
async function isNicknameAvailable(nickname) {
  try {
    const query = 'SELECT COUNT(*) AS count FROM users WHERE nickname = ?';
    const [rows] = await pool.execute(query, [nickname]);
    return rows[0].count === 0;
  } catch (err) {
    console.error('MySQL Error (isNicknameAvailable):', err);
    throw err;
  }
}

module.exports = {
  pool,
  getUserLevel,
  saveNickname,
  isNicknameAvailable,
};
