const Joi = require('joi');

const id                  = Joi.number().integer();
const employeeId          = Joi.string().min(3);
const orderNumber         = Joi.string();
const productsObject      = Joi.object();
const operationStatusId   = Joi.string().min(1);
const digipointSubstract  = Joi.number().positive().precision(2);

const createRuleSchema = Joi.object({
  employeeId         : employeeId.require(),
  productsObject     : productsObject,
  operationStatusId  : operationStatusId,
  digipointSubstract : digipointSubstract.require()
});


const updateRuleSchema = Joi.object({

  employeeId         : employeeId,
  orderNumber        : orderNumber,
  productsObject     : productsObject,
  operationStatusId  : operationStatusId,
  digipointSubstract : digipointSubstract

});


const getRuleSchema = Joi.object({
  id:id.required()
})

module.exports = { createRuleSchema, updateRuleSchema, getRuleSchema };
