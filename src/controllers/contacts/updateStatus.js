const { HttpCode } = require('../../helpers/constants');
const { ContactsService } = require('../../services');

const updateStatus = async (req, res, next) => {
  const body = req.body;
  const { contactId } = req.params;
  try {
    const newContact = await ContactsService.updateStatus(contactId, body);

    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { newContact },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatus;
