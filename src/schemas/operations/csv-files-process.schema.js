const Joi = require('joi');

const id                  = Joi.number().integer();


const getCsvFileProcessSchema = Joi.object({
  id:id.required()
})

module.exports = {  getCsvFileProcessSchema };
