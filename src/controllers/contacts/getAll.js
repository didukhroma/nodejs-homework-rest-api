const { HttpCode } = require('../../helpers/constants');
const { ContactsService } = require('../../services');

const getAll = async (_, res, next) => {
  try {
    const contacts = await ContactsService.getAll();
    res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { contacts } });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
