const express = require('express');
const contactsControllers = require('../../src/controllers');
const router = express.Router();

const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatus,
} = require('../../src/validation/contacts');

router
  .get('/', contactsControllers.getAll)
  .get('/:contactId', contactsControllers.getById)
  .post('/', validateCreateContact, contactsControllers.addNewContact)
  .delete('/:contactId', contactsControllers.remove)
  .put('/:contactId', validateUpdateContact, contactsControllers.update)
  .patch(
    '/:contactId/favorite',
    validateUpdateStatus,
    contactsControllers.updateStatus,
  );

module.exports = router;
