const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { createUser, login } = require('./controllers/users');
const errorHandler = require('./middlewares/errorHandler');
const auth = require('./middlewares/auth');
const { moviesRoutes } = require('./routes/movies');
const { userRoutes } = require('./routes/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { NotFoundError } = require('./errors');
const { validateRegisterData, validateLoginData } = require('./middlewares/validations');

const { PORT = 3000 } = process.env;

const app = express();

const handleOtherEndpoints = (req, res, next) => {
  next(new NotFoundError('Ресурс не найден'));
};

mongoose.connect('mongodb://localhost:27017/myfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('signup', validateRegisterData, createUser);
app.use('signin', validateLoginData, login);

app.use(auth);

app.use('/users', userRoutes);
app.use('/movies', moviesRoutes);

app.use(handleOtherEndpoints);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server works on ${PORT} port`);
});
