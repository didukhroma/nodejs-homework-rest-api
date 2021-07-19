const { HttpCode } = require('../../helpers/constants');
const { ContactsService } = require('../../services');

const addNewContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const newContact = await ContactsService.create(userId, req.body);
    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: { newContact },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addNewContact;
