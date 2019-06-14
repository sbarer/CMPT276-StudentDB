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

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM student');
      const results = { 'results': (result) ? result.rows : null};

      const insertQuert = 'INSERT INTO items(name,weight,height,hair_color,gpa,major,age) values($1, $2,$3,$4,$5,$6,$7)';
      var values = [data.name, data.weight, data.height, data.hair_color, data.gpa, data.major, data.age];
      app.post('/contact', function(req, res){
        pool.query(insertQuery, values);
      })
      // const text = 'INSERT INTO items(name,weight,height,hair_color,gpa,major,age) values($1, $2,$3,$4,$5,$6,$7)';
      // const data = {text: req.body.text};

      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

  



  .listen(PORT, () => console.log(`Listening on ${ PORT }`))