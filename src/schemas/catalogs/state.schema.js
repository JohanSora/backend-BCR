const Joi = require('joi');

const id         = Joi.number().integer();
const name       = Joi.string().min(3);
const cityId  = Joi.number().integer();

const createStateSchema = Joi.object({
  name:name.required(),
  cityId:cityId.required(),
});


const updateStateSchema = Joi.object({
  name:name,
  cityId:cityId
});


const getStateSchema = Joi.object({
  id:id.required()
})

module.exports = { createStateSchema, updateStateSchema, getStateSchema };
