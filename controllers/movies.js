const Movie = require('../models/movie');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../errors');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch(next);
};

// saveMovie
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
    owner: req.user._id,
  })
    .then((createdMovie) => {
      res.status(201).send(createdMovie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы неккоректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const movieId = req.params.id;

  Movie.findById(movieId)
    .orFail(new NotFoundError('Фильм не найден'))
    .then((deletedMovie) => {
      if (!deletedMovie.owner.equals(req.user._id)) {
        throw new ForbiddenError('Попытка удалить чужой фильм');
      }
      return Movie.findByIdAndDelete(movieId)
        .then(() => {
          res.status(200).send({ message: 'Фильм удалён' });
        });
    })
    .catch(next);
};

module.exports = { getMovies, createMovie, deleteMovie };
