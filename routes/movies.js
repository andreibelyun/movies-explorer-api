const express = require('express');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

const moviesRoutes = express.Router();

moviesRoutes.get('/', getMovies);
moviesRoutes.post('/', createMovie);
moviesRoutes.delete('/:id', deleteMovie);

exports.moviesRoutes = moviesRoutes;
