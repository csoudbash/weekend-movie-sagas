const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
console.log(req.params.id);
let id = req.params.id;
console.log(id)
  // Add query to get all genres
  const queryText=`SELECT genres.name
  FROM movies
  JOIN movies_genres
  ON movies.id = movies_genres.movie_id
  JOIN genres
  ON genres.id = movies_genres.genre_id
  WHERE movies.id = $1
  GROUP BY movies.title, genres.name;`
  pool.query(queryText, [id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error on query", error);
    });
});
module.exports = router;
