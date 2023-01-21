const Joi = require('joi');

const id                  = Joi.number().integer();
const name                = Joi.string().min(3);
const digipointsPerAmount = Joi.number().integer();
const quarterId           = Joi.number().integer();
const weeks               = Joi.string().min(10);
const baseAmount          = Joi.number().positive().precision(2);

const createRuleSchema = Joi.object({
  name:                   name.required(),
  digipointsPerAmount:    digipointsPerAmount.required(),
  quarterId:              quarterId.required(),
  weeks:                  weeks.required(),
  baseAmount:             baseAmount.required(),
});


const updateRuleSchema = Joi.object({
  name:                 name,
  digipointsPerAmount:  digipointsPerAmount,
  quarterId:            quarterId,
  weeks:                weeks,
  baseAmount:           baseAmount,
});


const getRuleSchema = Joi.object({
  id:id.required()
})

module.exports = { createRuleSchema, updateRuleSchema, getRuleSchema };
