const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_SERVER,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
db.connect((error, result) => {
  if (error) console.log(error);
  else {
    console.log('db connected');
  }
});

module.exports = db;
