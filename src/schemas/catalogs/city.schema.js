const Joi = require('joi');

const id         = Joi.number().integer();
const name       = Joi.string().min(3);
const countryId  = Joi.number().integer();

const createCitySchema = Joi.object({
  name:name.required(),
  countryId:countryId.required(),
});


const updateCitySchema = Joi.object({
  name:name,
  countryId:countryId
});


const getCitySchema = Joi.object({
  id:id.required()
})

module.exports = { createCitySchema, updateCitySchema, getCitySchema };
