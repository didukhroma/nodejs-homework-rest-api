const addNewContact = require('./addNewContact');
const getAll = require('./getAll');
const getById = require('./getById');
const remove = require('./remove');
const update = require('./update');
const updateStatus = require('./updateStatus');

module.exports = {
  getAll,
  getById,
  addNewContact,
  update,
  updateStatus,
  remove,
};
