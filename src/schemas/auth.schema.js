const Joi = require('joi');

const token = Joi.string().min(10);
const newPassword = Joi.string().min(8);

const getAuthSchema = Joi.object({
  token: token.required(),
  newPassword: newPassword.required()
});

module.exports = { getAuthSchema }
