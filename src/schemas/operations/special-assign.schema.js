const Joi = require('joi');


const employees           = Joi.array();
const userAssignedId      = Joi.number().integer();
const pointsAssign        = Joi.number().integer().positive();
const reason              = Joi.string().min(5).max(700);
const quarter             = Joi.number().integer().positive();
const week                = Joi.number().integer().positive();
const saleType            = Joi.string().min(2);


const createSpecialAssignSchema = Joi.object({
  employees:              employees,
  userAssignedId:         userAssignedId,
  pointsAssign:           pointsAssign,
  reason:                 reason,
  quarter:                quarter,
  week:                   week,
  saleType:               saleType,
});



/* const getRuleSchema = Joi.object({
  id:id.required()
}) */

module.exports = { createSpecialAssignSchema };
