const rateLimit = require('express-rate-limit');
const { HttpCode } = require('./constants');

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 2,
  handler: (req, res, next) => {
    res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: 'Too many request from this IP, please try again after an hour',
    });
  },
});
module.exports = { createAccountLimiter };
