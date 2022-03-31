const Movie = require('../models/movie');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameEN,
    nameRU,
    thumbnail,
    movieId,
    // owner: req.user._id,
    owner: 2141414124124124,
  })
    .then((createdMovie) => {
      res.status(201).send(createdMovie);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
    .then((deletedMovie) => {
      res.status(200).send(deletedMovie);
    })
    .catch(next);
};

module.exports = { getMovies, createMovie, deleteMovie };
