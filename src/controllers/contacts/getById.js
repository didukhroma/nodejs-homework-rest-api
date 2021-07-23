const { HttpCode } = require('../../helpers/constants');
const { ContactsService } = require('../../services');
const { ErrorHandler } = require('../../helpers/errorHandler');

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user.id;
  try {
    const result = await ContactsService.getById(userId, contactId);
    if (!result) throw new ErrorHandler(HttpCode.NOT_FOUND, 'Not found');
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contact: result },
    });
  } catch (error) {
    next(new ErrorHandler(HttpCode.NOT_FOUND, 'Not found', error.message));
  }
};

module.exports = getById;
