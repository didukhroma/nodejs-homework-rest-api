const Joi = require('joi');
const { HttpCode } = require('../../helpers/constants');
const { updateContact } = require('../../../model');

const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  phone: Joi.string().min(10),
});

const update = async (req, res, next) => {
  const body = req.body;
  const { contactId } = req.params;
  const isEmptyBody = Object.keys(body).length === 0;

  const { error } = contactSchema.validate(req.body);
  console.log(isEmptyBody);
  console.log(error);
  if (isEmptyBody || error) {
    res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: isEmptyBody ? 'missing fields' : error.message,
    });
    return;
  }

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
