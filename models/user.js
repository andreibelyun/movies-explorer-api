const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { UnauthorizatedError } = require('../errors');
const { WRONG_MAIL_OR_PASSWORD_MSG, INVALID_MAIL_MSG } = require('../utils/messages');

const isEmail = (email) => validator.isEmail(email);

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isEmail,
      message: INVALID_MAIL_MSG,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizatedError(WRONG_MAIL_OR_PASSWORD_MSG)); // почта
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizatedError(WRONG_MAIL_OR_PASSWORD_MSG)); // пароль
          }
          return user;
        });
    });
}

userSchema.statics.findUserByCredentials = findUserByCredentials;

module.exports = mongoose.model('user', userSchema);
