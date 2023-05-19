// require mysql module
const mysql = require("mysql");

// database connection object details
let mysqlConnection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE_NAME,
});

// database connection function
function connectToDB() {
  mysqlConnection.connect((err) => {
    if (err) throw err;
    console.log("Database Connection Successfully...!!");
  });
}

module.exports = { connectToDB, mysqlConnection };
