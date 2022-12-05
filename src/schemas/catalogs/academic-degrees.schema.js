const Joi = require('joi');

const id    = Joi.number().integer();
const name  = Joi.string().min(3);

const createAcademicDegreeSchema = Joi.object({
  name:name.required()
});


const updateAcademicDegreeSchema = Joi.object({
  name:name
});


const getAcademicDegreeSchema = Joi.object({
  id:id.required()
})

module.exports = { createAcademicDegreeSchema, updateAcademicDegreeSchema, getAcademicDegreeSchema };
