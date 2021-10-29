const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'newageFORMAT19!*',
    database: 'employee_tracker_db'
  });

 connection.connect(function(err){
     if(err) {
         console.log('Error connecting to db')
     }
     console.log('connected to the db successfully')
 })

  module.exports = connection;