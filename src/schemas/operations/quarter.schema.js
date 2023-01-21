const Joi = require('joi');

const id                 = Joi.number().integer();
const name               = Joi.string().min(3);
const fiscalPeriodId     = Joi.number().integer();
const weeksPerQuarter    = Joi.string().min(1);
const status             = Joi.boolean();

const createQuartersSchema = Joi.object({
  name:             name.required(),
  fiscalPeriodId:   fiscalPeriodId.required(),
  weeksPerQuarter:  weeksPerQuarter.required(),
  status:           status.required(),
});


const updateQuartersSchema = Joi.object({
  name:            name,
  fiscalPeriodId:  fiscalPeriodId,
  weeksPerQuarter: weeksPerQuarter,
  status:          status,
});


const getQuartersSchema = Joi.object({
  id:id.required()
})

module.exports = { createQuartersSchema, updateQuartersSchema, getQuartersSchema };
