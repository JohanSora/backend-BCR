const Joi = require('joi');

const id            = Joi.number().integer();
const name          = Joi.string().min(3);
const errorCode     = Joi.string().min(3);
const description   = Joi.string().min(3);

const createErrorSalesProcessSchema = Joi.object({
  name: name.required(),
  errorCode:errorCode,
  description: description.required(),
});


const updateErrorSalesProcessSchema = Joi.object({
  name: name,
  errorCode:errorCode,
  description:description,
});


const getErrorSalesProcessSchema = Joi.object({
  id:id.required()
})

module.exports = { createErrorSalesProcessSchema, updateErrorSalesProcessSchema, getErrorSalesProcessSchema };
