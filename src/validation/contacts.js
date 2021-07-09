const Joi = require('joi');
const isEmpty = require('lodash.isempty');
const { HttpCode } = require('../helpers/constants');

const schemaCreateContact = Joi.object({
  favorite: Joi.boolean().optional(),
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string().min(10).required(),
});

const schemaUpdateContact = Joi.object({
  favorite: Joi.boolean().optional(),
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .optional(),
  phone: Joi.string().min(10).optional(),
});

const validate = (schema, body, next) => {
  const { error, value } = schema.validate(body);
  const isEmptyBody = isEmpty(value);

  if (error || isEmptyBody) {
    let resMessage = '';
    if (isEmptyBody) {
      resMessage = 'missing fields';
    } else {
      const [{ message }] = error.details;
      resMessage = `Field: ${message.replace(/"/g, '')}`;
    }

    return next({
      status: HttpCode.BAD_REQUEST,
      message: resMessage,
      data: 'Bad Request',
    });
  }

  next();
};

module.exports.validateCreateContact = (req, res, next) =>
  validate(schemaCreateContact, req.body, next);

module.exports.validateUpdateContact = (req, res, next) =>
  validate(schemaUpdateContact, req.body, next);
