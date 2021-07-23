const isEmpty = require('lodash.isempty');
const { HttpCode } = require('../../helpers/constants');
const { ContactsService } = require('../../services');
const { ErrorHandler } = require('../../helpers/errorHandler');

const updateStatus = async (req, res, next) => {
  const body = req.body;
  if (isEmpty(body)) {
    next(new ErrorHandler(HttpCode.BAD_REQUEST, 'Missing field favorite'));
    return;
  }

  const { contactId } = req.params;
  const userId = req.user.id;
  try {
    const newContact = await ContactsService.updateStatus(
      userId,
      contactId,
      body,
    );

    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { newContact },
    });
  } catch (error) {
    next(new ErrorHandler(HttpCode.NOT_FOUND, 'Not found', error.message));
  }
};

module.exports = updateStatus;
