const Joi = require('joi');
const { HttpCode } = require('../helpers/constants');

const schemaUser = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().min(8).required(),
});

const schemaUpdateSubscription = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);
  console.log(error);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: HttpCode.BAD_REQUEST,
      message: message,
      data: 'Bad Request',
    });
  }
  next();
};

module.exports.validateUser = (req, _, next) => {
  validate(schemaUser, req.body, next);
};

module.exports.validateUpdateSubscription = (req, _, next) => {
  validate(schemaUpdateSubscription, req.body, next);
};
