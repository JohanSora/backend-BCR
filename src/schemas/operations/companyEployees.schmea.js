const Joi = require('joi');

const id         = Joi.number().integer();
const personId       = Joi.string().min(3);
const posId  = Joi.number().integer();

const createCompanyEmployeeSchema = Joi.object({
  personId:personId.required(),
  posId:posId.required(),
});


const updateCompanyEmployeeSchema = Joi.object({
  personId:personId,
  posId:posId
});


const getCompanyEmployeeSchema = Joi.object({
  id:id.required()
})

module.exports = { createCompanyEmployeeSchema, updateCompanyEmployeeSchema, getCompanyEmployeeSchema };
