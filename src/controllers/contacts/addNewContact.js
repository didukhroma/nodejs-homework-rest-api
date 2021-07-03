const Joi = require('joi');
const { HttpCode } = require('../../helpers/constants');
const { addContact } = require('../../../model');

const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string().min(10).required(),
});

const addNewContact = async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message,
    });
    return;
  }

  try {
    const newContact = await addContact(req.body);
    if (!newContact) {
      res.status(HttpCode.BAD_REQUEST).json({
        status: 'error',
        code: HttpCode.BAD_REQUEST,
        message: 'Contact is present in database',
      });
      return;
    }
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
