const express = require('express');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { moviesRoutes } = require('./movies');
const { userRoutes } = require('./users');
const { validateRegisterData, validateLoginData } = require('../middlewares/validations');
const { NotFoundError } = require('../errors');

const handleOtherEndpoints = (req, res, next) => {
  next(new NotFoundError('Ресурс не найден'));
};

const routes = express.Router();

routes.use('/signup', validateRegisterData, createUser);
routes.use('/signin', validateLoginData, login);

routes.use(auth);

routes.use('/users', userRoutes);
routes.use('/movies', moviesRoutes);

routes.use(handleOtherEndpoints);

exports.routes = routes;
