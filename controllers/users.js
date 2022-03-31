require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NotFoundError, BadRequestError, ConflictError } = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUserInfo = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((userData) => {
      res.status(200).send(userData);
    })
    .catch(next);
};

const updateOptions = {
  new: true,
  runValidators: true,
};

const updateUserInfo = (req, res, next) => {
  const { email, name } = req.boby;

  User.findByIdAndUpdate(req.user._id, { email, name }, updateOptions)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((newUserData) => {
      res.status(200).send(newUserData);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы неккоректные данные при обновлении информации о пользователе'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.boby;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы неккоректные данные при создании пользователя'));
      }
      if (err.code === 11000) {
        next(new ConflictError('Email занят'));
      } else next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.boby;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.status(200).send({ token });
    })
    .catch(next);
};

module.exports = {
  getUserInfo,
  updateUserInfo,
  createUser,
  login,
};
