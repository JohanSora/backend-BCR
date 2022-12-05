const Joi = require('joi');

const id        = Joi.number().integer();
const name      = Joi.string().min(3);

const createSalesGroupSchema = Joi.object({
  name:     name.required(),

});


const updateSalesGroupSchema = Joi.object({
  name:     name,
});


const getSalesGroupSchema = Joi.object({
  id:id.required()
})

module.exports = { getSalesGroupSchema, createSalesGroupSchema, updateSalesGroupSchema };
