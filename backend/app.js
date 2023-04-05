require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');
const router = require('./routes');
const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsOption = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());

// // подключаем мидлвары, роуты и тд
app.use(express.json());
app.use(cookieParser());

app.use(requestLogger); // логгер запросов

app.use(cors(corsOption));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

/// основные роуты
app.use(router);

app.use(errorLogger); // логгер ошибок

app.use(errors()); // celebrate

app.use(handleErrors);

// подключаемся к серверу mongo
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
}, () => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
