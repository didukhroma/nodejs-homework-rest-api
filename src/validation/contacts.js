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

const schemaUpdateStatus = Joi.object({
  favorite: Joi.boolean().required(),
});

const validate = (schema, body, next) => {
  const { error, value } = schema.validate(body);
  const isEmptyBody = isEmpty(value);

  if (error || isEmptyBody) {
    let resMessage = '';
    const [{ message }] = error.details;
    const isPresentFavorite = message.includes('favorite');

    if (isEmptyBody && !isPresentFavorite) {
      resMessage = 'missing fields';
    } else {
      resMessage = isPresentFavorite
        ? 'Missing field favorite'
        : `Field: ${message.replace(/"/g, '')}`;
    }

    return next({
      status: HttpCode.BAD_REQUEST,
      message: resMessage,
      data: 'Bad Request',
    });
  }

  next();
};

module.exports.validateCreateContact = (req, _, next) =>
  validate(schemaCreateContact, req.body, next);

module.exports.validateUpdateContact = (req, _, next) =>
  validate(schemaUpdateContact, req.body, next);

module.exports.validateUpdateStatus = (req, _, next) =>
  validate(schemaUpdateStatus, req.body, next);
