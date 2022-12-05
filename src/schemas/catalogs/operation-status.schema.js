const Joi = require('joi');

const id            = Joi.number().integer();
const name          = Joi.string().min(3);
const status        = Joi.boolean();



const createOperationStatusSchema = Joi.object({
  name:         name.required(),
  status:       status,

});


const updateOperationStatusSchema = Joi.object({
  name:        name,
  status:      status,

});


const getOperationStatusSchema = Joi.object({
  id:id.required()
})

module.exports = { createOperationStatusSchema, updateOperationStatusSchema, getOperationStatusSchema };
