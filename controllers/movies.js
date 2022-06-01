const Movie = require('../models/movie');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../errors');
const {
  INCORRECT_MOVIE_DATA_MSG,
  FORBIDDEN_REMOVE_MOVIE_MSG,
  SUCCESS_REMOVE_MOVIE_MSG,
  MOVIE_NOT_FOUND_MSG,
} = require('../utils/messages');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.status(200).send(movies.filter((movie) => movie.owner.toString() === req.user._id));
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
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  const data = {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameEN,
    nameRU,
    thumbnail,
    movieId,
    owner: req.user._id,
  };

  Movie.create(data)
    .then((movie) => {
      res.status(201).send({ _id: movie._id, ...data });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(INCORRECT_MOVIE_DATA_MSG));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const movieId = req.params.id;

  Movie.findById(movieId)
    .orFail(new NotFoundError(MOVIE_NOT_FOUND_MSG))
    .then((deletedMovie) => {
      if (!deletedMovie.owner.equals(req.user._id)) {
        throw new ForbiddenError(FORBIDDEN_REMOVE_MOVIE_MSG);
      }
      return Movie.findByIdAndDelete(movieId)
        .then(() => {
          res.status(200).send({ message: SUCCESS_REMOVE_MOVIE_MSG });
        });
    })
    .catch(next);
};

module.exports = { getMovies, createMovie, deleteMovie };
