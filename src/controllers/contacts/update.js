const { HttpCode } = require('../../helpers/constants');
const { ContactsService } = require('../../services');
const { ErrorHandler } = require('../../helpers/errorHandler');

const update = async (req, res, next) => {
  const body = req.body;
  const { contactId } = req.params;
  try {
    const updatedContact = await ContactsService.update(contactId, body);

    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { updatedContact },
    });
  } catch (error) {
    next(new ErrorHandler(HttpCode.NOT_FOUND, 'Not found', error.message));
  }
};

module.exports = update;
