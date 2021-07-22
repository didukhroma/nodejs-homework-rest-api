const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

const { HttpCode } = require('./src/helpers/constants');
const { apiLimit, jsonLimit } = require('./src/config/rate-limit.json');
const { ErrorHandler } = require('./src/helpers/errorHandler');

const usersRouter = require('./routes/api/users');
const contactsRouter = require('./routes/api/contacts');

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const apiLimiter = rateLimit({
  windowMs: apiLimit.windowMs,
  max: apiLimit.max,
  handler: (req, res, next) => {
    next(new ErrorHandler(HttpCode.BAD_REQUEST, 'Too many requests'));
  },
});

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: jsonLimit }));

app.use('/api/', apiLimiter);
app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR;
  res.status(err.status).json({
    status: err.status === HttpCode.INTERNAL_SERVER_ERROR ? 'fail' : 'error',
    code: err.status,
    message: err.message,
    data:
      err.status === HttpCode.INTERNAL_SERVER_ERROR
        ? 'Internal Server Error'
        : err.data,
  });
});

module.exports = app;
