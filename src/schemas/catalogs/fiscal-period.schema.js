const Joi = require('joi');

const id                = Joi.number().integer();
const dateStart         = Joi.string().min(3);
const quarterStart      = Joi.number().integer(10);
const dateEnd           = Joi.string().min(4);
const operationStatusId = Joi.number().integer();
const companyId         = Joi.number().integer();


const createFiscalPeriodSchema = Joi.object({

  dateStart:dateStart.required(),
  quarterStart:quarterStart.required(),
  dateEnd:dateEnd.required(),
  operationStatusId:operationStatusId.required(),
  companyId:companyId,

});


const updateFiscalPeriodSchema = Joi.object({
  dateStart:dateStart,
  quarterStart:quarterStart,
  dateEnd:dateEnd,
  operationStatusId:operationStatusId,
  companyId:companyId,


});


const getFiscalPeriodSchema = Joi.object({
  id:id.required()
})

module.exports = { createFiscalPeriodSchema, updateFiscalPeriodSchema, getFiscalPeriodSchema };
