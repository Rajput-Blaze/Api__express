const express = require('express');
const app = express();
const db = require('./db.js');
const { v4: uuidv4 } = require('uuid');
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'your on route directory',
  });
  res.end();
});

app.get('/api/students', (req, res) => {
  db.query('select * from student', (error, result) => {
    if (error) {
      res.json({
        error: error,
      });
    } else {
      if (result.length == 0) {
        return res.status(404).json({
          status: 'database is empty',
          info: '/api/students/-----to send data in database/',
        });

        // res.json({
        //   message: 'not have any ',
        //   info:  ',
        // });
      }
      res.json(result);
    }
  });
});

app.get('/api/students/:id', (req, res) => {
  const id = req.params.id;
  db.query('select * from student where id=?', id, (error, result) => {
    res.json(result);
  });
});

app.post('/api/students', (req, res) => {
  const { name, degree, sex } = req.body;
  var uuidData = uuidv4();
  const studentData = [uuidData, name, degree, sex];
  db.query(
    'insert into student value(?,?,?,?)',
    studentData,
    (error, result) => {
      if (error) throw error;
      else {
        if (result.affectedRows == 1) {
          res.json({ message: 'data inserted', id: studentData[0] });
        } else
          res.json({
            message: 'data not be inserted check input data',
            studentData,
          });
      }
    }
  );
  var uuidData = uuidv4();
});

app.put('/api/students/:id', (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const degree = req.body.degree;
  const sex = req.body.sex;
  const updateData = [
    {
      name,
      degree,
      sex,
    },
    id,
  ];
  db.query('update student set ? where id=?', updateData, (error, result) => {
    if (error) throw error;
    else res.json({ message: result.message, info: 'inseerted successful ' });
  });
});

app.delete('/api/students/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM student where id=?', id, (error, result) => {
    if (error) throw error;
    res.json({ message: 'deleted data sucessful' });
  });
});

app.listen(3000, (error) => {
  if (error) throw error.message;
  console.log('listen on port', 3000);
});
