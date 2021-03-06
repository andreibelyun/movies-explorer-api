const mongoose = require('mongoose');
const validator = require('validator');
const { INVALID_URL_MSG } = require('../utils/messages');

const isURL = (link) => validator.isURL(link);

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    reqiured: true,
  },
  director: {
    type: String,
    reqiured: true,
  },
  duration: {
    type: Number,
    reqiured: true,
  },
  year: {
    type: String,
    reqiured: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: isURL,
      message: INVALID_URL_MSG,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: isURL,
      message: INVALID_URL_MSG,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: isURL,
      message: INVALID_URL_MSG,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
