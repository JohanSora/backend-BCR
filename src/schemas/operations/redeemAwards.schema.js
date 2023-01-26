const Joi = require('joi');

const id                  = Joi.number().integer();
const employeeId          = Joi.number().integer();
const awardId             = Joi.number().integer();
const quarterId           = Joi.number().integer();
const digipointSubstract  = Joi.number().integer();
const operationStatusId   = Joi.number().integer();

const createRedeemAwardsSchema = Joi.object({
  employeeId:            employeeId.required(),
  awardId:               awardId.required(),
  quarterId:             quarterId.required(),
  digipointSubstract:    digipointSubstract.required(),
  operationStatusId:     operationStatusId,
});


const updateRedeemAwardsSchema = Joi.object({
  employeeId:           employeeId,
  awardId:              awardId,
  quarterId:            quarterId,
  digipointSubstract:   digipointSubstract,
  operationStatusId:    operationStatusId,

});


const getRedeemAwardsSchema = Joi.object({
  id:id.required()
})

module.exports = { createRedeemAwardsSchema, updateRedeemAwardsSchema, getRedeemAwardsSchema };
