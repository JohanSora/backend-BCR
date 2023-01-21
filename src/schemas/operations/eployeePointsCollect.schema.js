const Joi = require('joi');

const id                 = Joi.number().integer();
const employId           = Joi.string().min(3);
const status             = Joi.boolean();
const pointsAssigned     = Joi.number().integer();
const pointsRedeemed     = Joi.number().integer();
const pointsAssignedDate = Joi.date();
const userAssignedId     = Joi.number().integer();
const saleAssigned       = Joi.boolean();
const percentageSale     = Joi.number().integer();


const createEmployeePointsCollectSchema = Joi.object({
  employId:         employId.required(),
  status:           status,
  pointsAssigned: pointsAssigned.required(),
  pointsRedeemed:pointsRedeemed.required(),
  pointsAssignedDate: pointsAssignedDate.required(),
  userAssignedId: userAssignedId.required(),
  saleAssigned: saleAssigned.required(),
  percentageSale: percentageSale.required(),

});


const updateEmployeePointsCollectSchema = Joi.object({
  employId:   employId,
  status:     status,
  pointsAssigned: pointsAssigned,
  pointsRedeemed:pointsRedeemed,
  pointsAssignedDate: pointsAssignedDate,
  userAssignedId: userAssignedId,
  saleAssigned: saleAssigned,
  percentageSale: percentageSale,

});


const getEmployeePointsCollectSchema = Joi.object({
  id:id.required()
})

module.exports = { createEmployeePointsCollectSchema, updateEmployeePointsCollectSchema, getEmployeePointsCollectSchema };
