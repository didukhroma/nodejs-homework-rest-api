const { HttpCode } = require('../../helpers/constants');
// const { listContacts } = require('../../../model');
const { ContactsService } = require('../../services');
const contactsService = new ContactsService();

const getAll = async (_, res, next) => {
  try {
    // const contacts = await listContacts();
    const contacts = await contactsService.getAll();
    console.log(contacts);
    res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { contacts } });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
