const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'newageFORMAT19!*',
    database: 'content_management_db'
  });

  module.exports = db;