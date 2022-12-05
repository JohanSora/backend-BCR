const Joi = require('joi');

const id       = Joi.number().integer();
const name     = Joi.string().min(3);
const isoCode  = Joi.string().min(2).max(10);

const createCountrySchema = Joi.object({
  name:name.required(),
  isoCode:isoCode.required(),
});


const updateCountrySchema = Joi.object({
  name:name,
  isoCode:isoCode,
});


const getCountrySchema = Joi.object({
  id:id.required()
})

module.exports = { createCountrySchema, updateCountrySchema, getCountrySchema };
