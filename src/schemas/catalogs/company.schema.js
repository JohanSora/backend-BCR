const Joi = require('joi');

const id                  = Joi.number().integer();
const name                = Joi.string().min(3);
const representativeId    = Joi.number().integer(10);
const phoneNumber         = Joi.string().min(4);
const operationStatusId   = Joi.number().integer();


const createCompanySchema = Joi.object({

  name:name.required(),
  representativeId:representativeId.required(),
  phoneNumber:phoneNumber.required(),
  operationStatusId:operationStatusId.required(),

});


const updateCompanySchema = Joi.object({
  name:name,
  representativeId:representativeId,
  phoneNumber:phoneNumber,
  operationStatusId:operationStatusId,


});


const getCompanySchema = Joi.object({
  id:id.required()
})

module.exports = { createCompanySchema, updateCompanySchema, getCompanySchema };
