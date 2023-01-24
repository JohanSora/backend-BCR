const Joi = require('joi');

const id                  = Joi.number().integer();
const description         = Joi.string().min(5);
const countryId           = Joi.number().integer();
const companyId           = Joi.number().integer();
const personId            = Joi.number().integer();
const serie               = Joi.number().integer();
const status              = Joi.boolean();
const digipointsCollect   = Joi.number().integer()

const createPointOfSaleSchema = Joi.object({
  description:            description.required(),
  countryId:              countryId.required(),
  companyId:              companyId.required(),
  personId:               personId.required(),
  serie:                  serie.required(),
  status:                 status.required(),
  digipointsCollect:      digipointsCollect.required()

});


const updatePointOfSaleSchema = Joi.object({
  description:          description,
  countryId:            countryId,
  companyId:            companyId,
  personId:             personId,
  serie:                serie,
  status:               status,
  digipointsCollect:    digipointsCollect

});


const getPointOfSaleSchema = Joi.object({
  id:id.required()
})

module.exports = { createPointOfSaleSchema, updatePointOfSaleSchema, getPointOfSaleSchema };
