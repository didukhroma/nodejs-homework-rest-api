const router = require('express').Router();
const { usersControllers } = require('../../src/controllers');
const guard = require('../../src/helpers/guard');
const { createAccountLimiter } = require('../../src/helpers/rate-limit');
const upload = require('../../src/helpers/upload');

const {
  validateUser,
  validateUpdateSubscription,
} = require('../../src/validation/users');

router
  .get('/current', guard, usersControllers.current)
  .post('/signup', createAccountLimiter, validateUser, usersControllers.reg)
  .post('/login', validateUser, usersControllers.login)
  .post('/logout', guard, usersControllers.logout)
  .patch(
    '/',
    guard,
    validateUpdateSubscription,
    usersControllers.updateSubscription,
  )
  .patch(
    '/avatars',
    guard,
    upload.single('avatar'),
    usersControllers.updateAvatar,
  );

module.exports = router;
