const Joi = require('joi');

const id            = Joi.number().integer();
const description   = Joi.string().min(3);
const skuUuid       = Joi.string().min(3);
const salesGroupId  = Joi.number().integer();
const productTypeId = Joi.number().integer();
const status        = Joi.boolean();

const createProductSchema = Joi.object({
  description:     description.required(),
  skuUuid:         skuUuid.required(),
  salesGroupId:    salesGroupId.required(),
  productTypeId:   productTypeId.required(),
  status:          status.required(),

});


const updateProductSchema = Joi.object({
  description:     description,
  skuUuid:         skuUuid,
  salesGroupId:    salesGroupId,
  productTypeId:   productTypeId,
  status:          status,

});


const getProductSchema = Joi.object({
  id:id.required()
})

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
