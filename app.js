const express = require('express');
const mongoose = require('mongoose');
const { createUser, login } = require('./controllers/users');
const errorHandler = require('./middlewares/errorHandler');
const auth = require('./middlewares/auth');
const { moviesRoutes } = require('./routes/movies');
const { userRoutes } = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/myfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use('signup', createUser);
app.use('signin', login);

app.use(auth);

app.use('/users', userRoutes);
app.use('/movies', moviesRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server works on ${PORT} port`);
});
