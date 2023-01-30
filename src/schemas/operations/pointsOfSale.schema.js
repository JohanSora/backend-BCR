const Joi = require('joi');

const id                  = Joi.number().integer();
const description         = Joi.string().min(5);
const countryId           = Joi.number().integer();
const companyId           = Joi.number().integer();
const managerId            = Joi.number().integer();
const serie               = Joi.number().integer();
const status              = Joi.boolean();
const digipointsCollect   = Joi.number().integer()

const createPointOfSaleSchema = Joi.object({
  description:            description.required(),
  countryId:              countryId.required(),
  companyId:              companyId.required(),
  managerId:               managerId.required(),
  serie:                  serie,
  status:                 status.required(),
  digipointsCollect:      digipointsCollect

});


const updatePointOfSaleSchema = Joi.object({
  description:          description,
  countryId:            countryId,
  companyId:            companyId,
  managerId:             managerId,
  serie:                serie,
  status:               status,
  digipointsCollect:    digipointsCollect

});


const getPointOfSaleSchema = Joi.object({
  id:id.required()
})

module.exports = { createPointOfSaleSchema, updatePointOfSaleSchema, getPointOfSaleSchema };
