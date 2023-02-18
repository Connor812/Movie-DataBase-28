const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'movie_db'
  },
  console.log(`Connected to the movie_db database.`)
);



app.get('/', (req, res) => {
    res.send("hello")
})

app.get('/api/movies', (req, res) => {
    db.query('SELECT ', function (err, results) {
        console.log(results);
        res.send(results)
      });
})

app.get('/api/reviews', (req, res) => {
    db.query('SELECT * FROM reviews', function (err, results) {
        console.log(results)
        res.send(results);
    })
})

app.post('/api/add-movie', (req, res) => {
    console.log(req.body)
    const newMovie = req.body;
    db.query('INSERT INTO movies SET ?', newMovie, function (err, results) {
        console.log('Success');
    });
    res.send("Success")
});

app.put('/api/update-review', (req, res) => {
    const newReview = [req.body.review, req.body.id];
    
    db.query(`UPDATE reviews SET review = ? WHERE id= ?`, newReview, function (err, results) {
        console.log('Success');
    });
    res.send('Success')
})

app.delete('/api/movie/:id', (req, res) => {
    const deleteMovie = req.params.id;
    db.query(`DELETE FROM movies WHERE id = ?`, deleteMovie, function (err, results) {
        console.log('Success');
    })
})

  app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);