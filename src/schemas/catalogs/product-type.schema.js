const Joi = require('joi');

const id        = Joi.number().integer();
const name      = Joi.string().min(3);

const createProductTypeSchema = Joi.object({
  name:     name.required(),

});


const updateProductTypeSchema = Joi.object({
  name:     name,
});


const getProductTypeSchema = Joi.object({
  id:id.required()
})

module.exports = { createProductTypeSchema, updateProductTypeSchema, getProductTypeSchema };
