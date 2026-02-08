const Joi = require("joi");

module.exports = Joi.object({
  title: Joi.string().required(),
  track: Joi.string().required(),
  trackLocation: Joi.string().required(),
  car: Joi.string().required(),
  date: Joi.date().required()
});
