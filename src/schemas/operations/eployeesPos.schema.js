const Joi = require('joi');

const id         = Joi.number().integer();
const employeeId       = Joi.string().min(3);
const posId  = Joi.number().integer();

const createEmployeePosSchema = Joi.object({
  employeeId:employeeId.required(),
  posId:posId.required(),
});


const updateEmployeePosSchema = Joi.object({
  employeeId:employeeId,
  posId:posId
});


const getEmployeePosSchema = Joi.object({
  id:id.required()
})

module.exports = { createEmployeePosSchema, updateEmployeePosSchema, getEmployeePosSchema };
