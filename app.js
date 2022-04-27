const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
// const { limiter } = require('./middlewares/limiter');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { routes } = require('./routes');
const { PORT, DB_ADRESS } = require('./utils/config');

const app = express();

mongoose.connect(DB_ADRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);
// app.use(limiter);
app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server works on ${PORT} port`);
});
