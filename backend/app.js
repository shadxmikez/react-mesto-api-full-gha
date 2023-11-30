require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');

const helmet = require('helmet');
const { errors } = require('celebrate');
const centralizedErrors = require('./middlewares/centralized-errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('cors');

const router = require('./routes/index');

const app = express();
const {
  PORT = 3000,
  DB = 'mongodb://localhost:27017/mestodb',
} = process.env;

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Successful connection to MongoDB'))
  .catch((error) => console.error('Connection to MongoD failed', error));

mongoose.set({ runValidators: true });

app.use(express.json());
app.use(helmet());
app.use(requestLogger);
app.use(cors());

app.use(router);

app.use(errorLogger);
app.use(errors());

app.use(centralizedErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
