const Joi = require('joi');

const id                  = Joi.number().integer();
const employeeId          = Joi.number().integer()
const orderNumber         = Joi.string();
const productsObject      = Joi.array();
const operationStatusId   = Joi.string().min(1);
const digipointSubstract  = Joi.number().positive().precision(2);

const createOrderCartSchema = Joi.object({
  employeeId         : employeeId.required(),
  productsObject     : productsObject.required(),
  operationStatusId  : operationStatusId,
  digipointSubstract : digipointSubstract.required()
});


const updateOrderCartSchema = Joi.object({

  employeeId         : employeeId,
  orderNumber        : orderNumber,
  productsObject     : productsObject,
  operationStatusId  : operationStatusId,
  digipointSubstract : digipointSubstract

});


const getOrderCartSchema = Joi.object({
  id:id.required()
})

module.exports = { createOrderCartSchema, updateOrderCartSchema, getOrderCartSchema };
