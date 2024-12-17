require('dotenv').config();
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const Ajv = require('ajv');
const winston = require('winston');
const bcrypt = require('bcrypt');

const DB_DIR = process.env.DB_DIR || path.join(__dirname, 'db');
const DB_FILE = process.env.DB_FILE || 'db.sqlite';

mkdirp.sync(DB_DIR);

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(DB_DIR, 'db.log') }),
  ],
});

const dbPath = path.join(DB_DIR, DB_FILE);
const db = new Database(dbPath, { verbose: logger.info });

logger.info(`Database initialized at ${dbPath}`);

const initSchema = `
CREATE TABLE IF NOT EXISTS users (
  discord_id TEXT PRIMARY KEY,
  nickname TEXT NOT NULL,
  level INTEGER DEFAULT 1
)
`;

try {
  db.exec(initSchema);
  logger.info('Table schema initialized.');
} catch (err) {
  logger.error('Error initializing schema:', err);
  process.exit(1);
}

const ajv = new Ajv();
const nicknameSchema = {
  type: 'string',
  pattern: '^[가-힣a-zA-Z0-9]{1,10}$',
};
const validateNickname = ajv.compile(nicknameSchema);

/**
 * @param {string} userId
 * @returns {Promise<number>}
 */
async function getUserLevel(userId) {
  const query = 'SELECT level FROM users WHERE discord_id = ?';
  try {
    const row = db.prepare(query).get(userId);
    return row ? row.level : 1;
  } catch (err) {
    logger.error('Error fetching user level:', err);
    throw err;
  }
}

/**
 * @param {string} userId
 * @param {string} nickname
 * @returns {Promise<void>}
 */
function getUserByUsername(username) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    db.get(query, [username], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function createUser(username, password) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.run(query, [username, password], function (err) {
      if (err) return reject(err);
      resolve();
    });
  });
}

async function saveNickname(userId, nickname) {
  if (!validateNickname(nickname)) {
    logger.warn('Invalid nickname:', nickname);
    throw new Error('Invalid nickname format.');
  }

  const query = `
    INSERT INTO users (discord_id, nickname)
    VALUES (?, ?)
    ON CONFLICT(discord_id) DO UPDATE SET nickname = excluded.nickname
  `;
  try {
    db.prepare(query).run(userId, nickname);
    logger.info(`Nickname saved for user ${userId}`);
  } catch (err) {
    logger.error('Error saving nickname:', err);
    throw err;
  }
}

/**
 * @param {string} nickname
 * @returns {Promise<boolean>}
 */
async function isNicknameAvailable(nickname) {
  const query = 'SELECT COUNT(*) AS count FROM users WHERE nickname = ?';
  try {
    const row = db.prepare(query).get(nickname);
    return row.count === 0;
  } catch (err) {
    logger.error('Error checking nickname availability:', err);
    throw err;
  }
}

function closeDatabase() {
  try {
    db.close();
    logger.info('Database connection closed.');
  } catch (err) {
    logger.error('Error closing database:', err);
  }
}

process.on('SIGINT', () => {
  closeDatabase();
  process.exit(0);
});

module.exports = {
  db,
  getUserByUsername,
  createUser,
  getUserLevel,
  saveNickname,
  isNicknameAvailable,
};
