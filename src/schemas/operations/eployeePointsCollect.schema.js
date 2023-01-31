const Joi = require('joi');

const id                 = Joi.number().integer();
const employeeId         = Joi.number().integer();
const statusId           = Joi.boolean();
const pointsAssigned     = Joi.number().integer();
const pointsRedeemed     = Joi.number().integer();
const pointsAssignedDate = Joi.date();
const userAssignedId     = Joi.number().integer();
const saleAssigned       = Joi.boolean();
const percentageSale     = Joi.number().integer();
const saleId             = Joi.number().integer();



const createEmployeePointsCollectSchema = Joi.object({
  employeeId:         employeeId.required(),
  statusId:           statusId,
  pointsAssigned:     pointsAssigned.required(),
  pointsRedeemed:     pointsRedeemed,
  pointsAssignedDate: pointsAssignedDate,
  userAssignedId:     userAssignedId.required(),
  saleAssigned:       saleAssigned.required(),
  percentageSale:     percentageSale,
  saleId:             saleId.required()


});


const updateEmployeePointsCollectSchema = Joi.object({
  employeeId:         employeeId,
  statusId:           statusId,
  pointsAssigned:     pointsAssigned,
  pointsRedeemed:     pointsRedeemed,
  pointsAssignedDate: pointsAssignedDate,
  userAssignedId:     userAssignedId,
  saleAssigned:       saleAssigned,
  percentageSale:     percentageSale

});


const getEmployeePointsCollectSchema = Joi.object({
  id:id.required()
})

module.exports = { createEmployeePointsCollectSchema, updateEmployeePointsCollectSchema, getEmployeePointsCollectSchema };
