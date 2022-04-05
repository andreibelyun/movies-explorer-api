const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NotFoundError, BadRequestError, ConflictError } = require('../errors');
const { JWT_SECRET } = require('../utils/config');
const {
  INCORRECT_USER_DATA_MSG,
  USER_ALREADY_EXISTS_MSG,
  USER_NOT_FOUND_MSG,
  INCORRECT_UPDATE_USER_DATA_MSG,
} = require('../utils/messages');

const getUserInfo = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    .orFail(new NotFoundError(USER_NOT_FOUND_MSG))
    .then((userData) => {
      res.status(200).send({
        email: userData.email,
        name: userData.name,
      });
    })
    .catch(next);
};

const updateOptions = {
  new: true,
  runValidators: true,
};

const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, updateOptions)
    .orFail(new NotFoundError(USER_NOT_FOUND_MSG))
    .then((newUserData) => {
      res.status(200).send({
        email: newUserData.email,
        name: newUserData.name,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(INCORRECT_UPDATE_USER_DATA_MSG));
      } else if (err.code === 11000) {
        next(new ConflictError(USER_ALREADY_EXISTS_MSG));
      } else next(err);
    });
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => {
      res.status(201).send({
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(INCORRECT_USER_DATA_MSG));
      } else if (err.code === 11000) {
        next(new ConflictError(USER_ALREADY_EXISTS_MSG));
      } else next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
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
