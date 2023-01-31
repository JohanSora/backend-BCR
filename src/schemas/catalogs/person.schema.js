const Joi = require('joi');

const id                = Joi.number().integer();
const names             = Joi.string().min(3);
const lastName          = Joi.string().min(3);
const birthDate         = Joi.date();
const position          = Joi.string().min(5);
const phoneNumber       = Joi.string().min(4);
const operationStatusId = Joi.number().integer(); //statusId
const userId            = Joi.number().integer(); //statusId
const academicDegreeId  = Joi.number().integer();
const languageId        = Joi.number().integer();



const createPersonSchema = Joi.object({
  names             :names.required(),
  lastName          :lastName.required(),
  birthDate         :birthDate.required(),
  position          :position.required(),
  phoneNumber       :phoneNumber.required(),
  operationStatusId :operationStatusId.required(),
  userId            :userId.required(),
  academicDegreeId  :academicDegreeId.required(),
  languageId        :languageId.required()

});


const updatePersonSchema = Joi.object({
  names             :names,
  lastName          :lastName,
  birthDate         :birthDate,
  position          :position,
  phoneNumber       :phoneNumber,
  operationStatusId :operationStatusId,
  userId            :userId,
  academicDegreeId  :academicDegreeId,
  languageId        :languageId

});


const getPersonSchema = Joi.object({
  id:id.required()
})

module.exports = { createPersonSchema, updatePersonSchema, getPersonSchema };
