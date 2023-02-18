SELECT movies.movie_name AS movie, reviews.review 
FROM reviews
INNER JOIN movies
ON reviews.movie_id = movie_id
ORDER BY movies.movie_name;
