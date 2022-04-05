require('dotenv').config();

const {
  NODE_ENV,
  PORT,
  DB_ADRESS,
  JWT_SECRET,
} = process.env;

const config = (NODE_ENV === 'production')
  ? {
    PORT,
    DB_ADRESS,
    JWT_SECRET,
  }
  : {
    PORT: 3000,
    DB_ADRESS: 'mongodb://localhost:27017/moviesdb',
    JWT_SECRET: 'dev-secret',
  };

module.exports = config;
