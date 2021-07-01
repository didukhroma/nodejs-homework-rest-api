const express = require('express');

const controllerContacts = require('../../src/controllers/contacts');

const router = express.Router();

router
  .get('./', controllerContacts.getAll)
  .get('./:contactId', controllerContacts.getByID)
  .post('./', controllerContacts.create)
  .delete('./:contactId', controllerContacts.remove)
  .put('./:contactId', controllerContacts.update);

module.exports = router;
