const { HttpCode } = require('../../helpers/constants');
// const { removeContact } = require('../../../model');
const { ContactsService } = require('../../services');

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    // const contact = await removeContact(contactId);
    const contact = await ContactsService.remove(contactId);
    if (contact) {
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        message: 'contact deleted',
      });
    } else {
      res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Not found ',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = remove;
