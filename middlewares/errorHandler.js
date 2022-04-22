const { DEFAULT_SERVER_ERROR_MSG } = require('../utils/messages');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = statusCode === 500 ? DEFAULT_SERVER_ERROR_MSG : err.message;

  res.status(statusCode).send({ message: errorMessage });

  next();
};

module.exports = errorHandler;
