const Joi = require('joi');

const id                  = Joi.number().integer();
const name                = Joi.string().min(3);
const quarterId           = Joi.number().integer();

const createWeekSchema = Joi.object({
  name:                   name.required(),
  quarterId:              quarterId.required()

});


const updateWeekSchema = Joi.object({
  name:                 name,
  quarterId:            quarterId

});


const getWeekSchema = Joi.object({
  id:id.required()
})

module.exports = { createWeekSchema, updateWeekSchema, getWeekSchema };
