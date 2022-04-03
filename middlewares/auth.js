const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const { UnauthorizatedError } = require('../errors');
const { NOT_AUTHORIZED_MSG } = require('../utils/messages');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizatedError(NOT_AUTHORIZED_MSG));
    return;
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizatedError(NOT_AUTHORIZED_MSG));
    return;
  }

  req.user = payload;
  next();
};
