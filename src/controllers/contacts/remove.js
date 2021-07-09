const { HttpCode } = require('../../helpers/constants');
const { ContactsService } = require('../../services');
const { ErrorHandler } = require('../../helpers/errorHandler');

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await ContactsService.remove(contactId);
    if (!result) throw new ErrorHandler(HttpCode.NOT_FOUND, 'Not found ');
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      message: 'contact deleted',
    });
    return;
  } catch (error) {
    next(new ErrorHandler(HttpCode.NOT_FOUND, 'Not found ', error.message));
  }
};

module.exports = remove;
