const Joi = require('joi');

const id         = Joi.number().integer();



const getReporterSchema = Joi.object({
  id:id.required()
})

module.exports = { getReporterSchema };
