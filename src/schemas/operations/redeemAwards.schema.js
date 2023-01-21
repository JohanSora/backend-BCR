const Joi = require('joi');

const id                  = Joi.number().integer();
const employeeId          = Joi.string().min(3);
const awardId             = Joi.number().integer();
const quarterId           = Joi.number().integer();
const digipointSubstract  = Joi.number().integer();

const createRedeemAwardsSchema = Joi.object({
  employeeId:             employeeId.required(),
  awardId:                awardId.required(),
  quarterId:              quarterId.required(),
  digipointSubstract:     digipointSubstract.required(),
});


const updateRedeemAwardsSchema = Joi.object({
  employeeId:            employeeId,
  awardId:               awardId,
  quarterId:             quarterId,
  digipointSubstract:    digipointSubstract,
});


const getRedeemAwardsSchema = Joi.object({
  id:id.required()
})

module.exports = { createRedeemAwardsSchema, updateRedeemAwardsSchema, getRedeemAwardsSchema };
