const { HttpCode } = require('../../helpers/constants');
// const { addContact } = require('../../../model');
const { ContactsService } = require('../../services');

const addNewContact = async (req, res, next) => {
  try {
    // const newContact = await addContact(req.body);
    const newContact = await ContactsService.create(req.body);
    if (!newContact) {
      res.status(HttpCode.BAD_REQUEST).json({
        status: 'error',
        code: HttpCode.BAD_REQUEST,
        message: 'Contact is present in database',
      });
      return;
    }
    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: { newContact },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addNewContact;
