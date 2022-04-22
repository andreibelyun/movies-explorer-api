const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const isURL = (value, helpers, field) => {
  if (validator.isURL(value)) return value;
  return helpers.message(`Поле ${field} заполнено некорректно`);
};

const validateRegisterData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateLoginData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUserData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateMovieData = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((v, h) => isURL(v, h, 'image')),
    trailerLink: Joi.string().required().custom((v, h) => isURL(v, h, 'trailerLink')),
    thumbnail: Joi.string().required().custom((v, h) => isURL(v, h, 'thumbnail')),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  validateRegisterData,
  validateLoginData,
  validateUserData,
  validateMovieData,
  validateMovieId,
};
