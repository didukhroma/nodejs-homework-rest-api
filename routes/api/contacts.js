const express = require('express');
const { contactsControllers } = require('../../src/controllers');
const router = express.Router();

const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatus,
} = require('../../src/validation/contacts');

const guard = require('../../src/helpers/guard');

router
  .get('/', guard, contactsControllers.getAll)
  .get('/:contactId', guard, contactsControllers.getById)
  .post('/', guard, validateCreateContact, contactsControllers.addNewContact)
  .delete('/:contactId', guard, contactsControllers.remove)
  .put('/:contactId', guard, validateUpdateContact, contactsControllers.update)
  .patch(
    '/:contactId/favorite',
    guard,
    validateUpdateStatus,
    contactsControllers.updateStatus,
  );

module.exports = router;
