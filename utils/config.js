require('dotenv').config();

const {
  NODE_ENV,
  PORT,
  DB_NAME,
  JWT_SECRET,
} = process.env;

const config = (NODE_ENV === 'production')
  ? {
    PORT,
    DB_NAME,
    JWT_SECRET,
  }
  : {
    PORT: 3000,
    DB_NAME: 'moviesdb',
    JWT_SECRET: 'dev-secret',
  };

module.exports = config;
