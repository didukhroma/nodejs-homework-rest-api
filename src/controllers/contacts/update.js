const { HttpCode } = require('../../helpers/constants');
const { updateContact } = require('../../../model');

const update = async (req, res, next) => {
  const body = req.body;
  const { contactId } = req.params;

  try {
    const newContact = await updateContact(contactId, body);

    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { newContact },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = update;
