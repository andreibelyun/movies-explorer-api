require('dotenv').config();
const jwt = require('jsonwebtoken');
const { UnauthorizatedError } = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizatedError('Необходима авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new UnauthorizatedError('Необходима авторизация'));
    return;
  }

  req.user = payload;
  next();
};
