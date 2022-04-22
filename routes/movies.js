const express = require('express');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateMovieData, validateMovieId } = require('../middlewares/validations');

const moviesRoutes = express.Router();

moviesRoutes.get('/', getMovies);
moviesRoutes.post('/', validateMovieData, createMovie);
moviesRoutes.delete('/:id', validateMovieId, deleteMovie);

exports.moviesRoutes = moviesRoutes;
