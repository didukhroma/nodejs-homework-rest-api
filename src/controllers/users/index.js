const reg = require('./reg');
const login = require('./login');
const logout = require('./logout');
const current = require('./current');
const updateSubscription = require('./updateSubscription');
const updateAvatar = require('./updateAvatar');
const verification = require('./verification');
const repeatVerification = require('./repeatVerification');

module.exports = {
  reg,
  login,
  logout,
  current,
  updateSubscription,
  updateAvatar,
  verification,
  repeatVerification,
};
