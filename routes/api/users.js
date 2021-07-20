const router = require('express').Router();
const { usersControllers } = require('../../src/controllers');
const guard = require('../../src/helpers/guard');
const { createAccountLimiter } = require('../../src/helpers/rate-limit');

const { validateUser } = require('../../src/validation/users');

router
  .get('/current', guard, usersControllers.current)
  .post('/signup', createAccountLimiter, validateUser, usersControllers.reg)
  .post('/login', validateUser, usersControllers.login)
  .post('/logout', guard, usersControllers.logout);

module.exports = router;
