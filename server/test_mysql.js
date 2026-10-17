const mysql = require('mysql2/promise');

const passwordsToTest = ['', 'root', 'admin', 'password', '1234', '123456', '12345678', 'mysql', 'MySQL', 'root123'];

async function testConnections() {
  for (const pwd of passwordsToTest) {
    try {
      const conn = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: pwd,
        database: 'smartinstitute_crm'
      });
      console.log(`SUCCESS: Connected with password: "${pwd}"`);
      await conn.end();
      process.exit(0);
    } catch (err) {
      if (err.code === 'ER_ACCESS_DENIED_ERROR') {
        // wrong password, try next
      } else {
        console.log(`Connection error with password "${pwd}":`, err.code, err.message);
      }
    }
  }
  console.log('FAIL: None of the common default passwords matched.');
  process.exit(1);
}

testConnections();
