const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'api',
});
db.connect((error, result) => {
  if (error) console.log(error);
  else {
    console.log('db connected');
  }
});
// db.query('select * from student', (error, result) => {
//   if (!error) res.json(result);
//   else res.json(error);
// });
module.exports = db;
