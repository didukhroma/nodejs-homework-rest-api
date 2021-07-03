const { HttpCode } = require('../../helpers/constants');
const { listContacts } = require('../../../model');

const getAll = async (_, res, next) => {
  try {
    const contacts = await listContacts();
    res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { contacts } });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
