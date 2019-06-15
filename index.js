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


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));
app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM student order by id ASC');
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
  // split off input elements into their own variables
  var name = req.body.name;
  var weight = req.body.weight;
  var height = req.body.height;
  var hair = req.body.hair_color;
  var gpa = req.body.gpa;
  var major = req.body.major;
  var age = req.body.age;

  // run all checks for invalid inputs
  if(!checknum(weight) || weight < 0 || !checknum(height) || height < 0 || !checknum(gpa) || gpa > 4.3 || gpa < 0|| !checknum(age) || age < 0) {
    res.redirect('https://simon-barer-a2.herokuapp.com/addStudent.html'); 
  }

  // add values into new database entry
  pool.query("INSERT INTO student(name,weight,height,hair_color,gpa,major,age) values ('" + name + "','" + weight + "','" + height + "','" + hair + "','" + gpa + "','" + major + "','" + age + "')");
  res.redirect('https://simon-barer-a2.herokuapp.com/db');
});

app.post('/updateStudent', function(req,res){
  console.log(req.body);
  // split off input elements into their own variables
  var name = req.body.name;
  var weight = req.body.weight;
  var height = req.body.height;
  var hair = req.body.hair_color;
  var gpa = req.body.gpa;
  var major = req.body.major;
  var age = req.body.age;
  // run all checks for invalid inputs, if valid, update database with new entries
  pool.query("UPDATE student SET name = '" + name + "' where id = '" + req.body.id + "';"); 
  if(checknum(weight) && weight > 0) {
    pool.query("UPDATE student SET weight = '" + weight + "' where id = '" + req.body.id + "';"); 
  } 
  // else {
  //   res.send("failure");
  // }
  if(checknum(height) && height > 0) {
    pool.query("UPDATE student SET height = '" + height + "' where id = '" + req.body.id + "';"); }
  pool.query("UPDATE student SET hair_color = '" + hair + "' where id = '" + req.body.id + "';"); 
  if(checknum(gpa) && gpa < 4.3 && gpa > 0) {
    pool.query("UPDATE student SET gpa = '" + gpa + "' where id = '" + req.body.id + "';"); }
  pool.query("UPDATE student SET major = '" + major + "' where id = '" + req.body.id + "';"); 
  if(checknum(age) && age > 0) {
    pool.query("UPDATE student SET age = '" + age + "' where id = '" + req.body.id + "';"); }

  res.redirect('https://simon-barer-a2.herokuapp.com/db');
});

// app.post('/deleteStudent', function(req,res){
//   console.log("entered deleteStudent");


// });

function checknum(val) {
  if (isNaN(val)) {
      return false;
  } else {
      return true;
  }
}


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))