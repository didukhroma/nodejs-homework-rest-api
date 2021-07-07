const { HttpCode } = require('../../helpers/constants');
// const { getContactById } = require('../../../model');

const { ContactsService } = require('../../services');
// const contactsService = new ContactsService();

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    // const result = await getContactById(contactId);
    const result = await ContactsService.getById(contactId);
    if (!result) {
      next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found',
      });
      return;
    }
    res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { result } });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
