const express = require('express');
const contactsControllers = require('../../src/controllers');
const router = express.Router();

router
  .get('/', contactsControllers.getAll)
  .get('/:contactId', contactsControllers.getById)
  .post('/', contactsControllers.addNewContact)
  .delete('/:contactId', contactsControllers.remove)
  .put('/:contactId', contactsControllers.update);

module.exports = router;
