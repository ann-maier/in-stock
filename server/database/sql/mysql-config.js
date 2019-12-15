const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '54906',
  database: 'store'
});

module.exports = pool;
