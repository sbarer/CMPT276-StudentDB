const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const app = express();

const { Pool } = require('pg');
var pool = new Pool({
  connectionString : process.env.DATABASE_URL
});

pool.connect();

// const router = express.Router();


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));
app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM student');
    const results = { 'results': (result) ? result.rows : null};
    res.render('pages/db', results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});
  // const text = 'INSERT INTO items(name,weight,height,hair_color,gpa,major,age) values($1, $2,$3,$4,$5,$6,$7)';
app.post('/insertStudent', function(req, res){
  console.log(req.body);

  console.log("update Student set " + data + " where name ='" + req.body.multi + "';");

  var name = req.body.name;
  var weight = req.body.weight;
  var height = req.body.height;
  var hair = req.body.hair_color;
  var gp = req.body.gpa;
  var major = req.body.major;
  var age = req.body.age;

  console.log(req.body.name);
  console.log(name);
  console.log(req.body.weight);
  console.log(weight);
  console.log(req.body.height);
  console.log(height);
  console.log(req.body.hair_color);
  console.log(hair);


  // const insertQuery = 'INSERT INTO student(name,weight,height,hair_color,gpa,major,age) values ($1,$2,$3,$4,$5,$6,$7)';
  var values = "('" + req.body.name + "','" + req.body.weight + "'," + req.body.height + "','" + req.body.hair_color + "','" + req.body.gpa + "','" + req.body.major + "','" + req.body.age + "')";
  pool.query("INSERT INTO student(name,weight,height,hair_color,gpa,major,age) values " + values);
  res.redirect('https://simon-barer-a2.herokuapp.com/db');
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))