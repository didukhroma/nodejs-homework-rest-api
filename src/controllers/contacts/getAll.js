const { HttpCode } = require('../../helpers/constants');
const { ContactsService } = require('../../services');

const getAll = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const contacts = await ContactsService.getAll(userId, req.query);
    res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { ...contacts } });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
