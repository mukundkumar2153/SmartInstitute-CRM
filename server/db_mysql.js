const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'smartinstitute_crm',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

console.log(`[MySQL] Connecting to database "${dbConfig.database}" on ${dbConfig.host}:${dbConfig.port} as user "${dbConfig.user}"...`);

const pool = mysql.createPool(dbConfig);

// Test the connection immediately
async function checkConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('[MySQL] Connected successfully to MySQL database "smartinstitute_crm"!');
    connection.release();
    return true;
  } catch (err) {
    console.error('[MySQL Error] Connection failed:', err.message);
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('[MySQL Error] Please check your DB_PASSWORD in the .env file!');
    }
    return false;
  }
}

checkConnection();

module.exports = pool;
