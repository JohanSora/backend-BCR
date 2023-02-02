const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);
const email = Joi.string().email();
const password = Joi.string().min(8);
const recoveryToken = Joi.string().min(5);
const profilePhotoPath = Joi.string().min(5);
const roleId = Joi.number().integer();
const policy = Joi.boolean();
const passwordReset = Joi.boolean();
const region = Joi.string().min(2);
const cpf = Joi.string().min(2);
const names = Joi.string().min(3);
const lastName = Joi.string().min(3);
const birthDate = Joi.date();
const position = Joi.string().min(3);
const phoneNumber = Joi.string().min(5);
const operationStatusId = Joi.number().integer(); //statusId
const academicDegreeId = Joi.number().integer();
const languageId = Joi.number().integer();
const posId = Joi.number().integer();

const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  recoveryToken: recoveryToken,
  profilePhotoPath: profilePhotoPath,
  roleId: roleId.required(),
  policy: policy,
  passwordReset: passwordReset,
  region: region,
  cpf: cpf,
  person: Joi.object({
    names: names.required(),
    lastName: lastName.required(),
    birthDate: birthDate.required(),
    position: position.required(),
    phoneNumber: phoneNumber.required(),
    operationStatusId: operationStatusId.required(),
    academicDegreeId: academicDegreeId.required(),
    languageId: languageId.required(),
  }),
  employeePos: {
    posId: posId.required(),
  },
});

const updateUserSchema = Joi.object({
  name: name,
  email: email,
  password: password,
  recoveryToken: recoveryToken,
  profilePhotoPath: profilePhotoPath,
  roleId: roleId,
  policy: policy,
  passwordReset: passwordReset,
  region: region,
  cpf: cpf,
  person: Joi.object({
    names: names,
    lastName: lastName,
    birthDate: birthDate,
    position: position,
    phoneNumber: phoneNumber,
    operationStatusId: operationStatusId,
    academicDegreeId: academicDegreeId,
    languageId: languageId,
  }),
  employeePos: {
    posId: posId,
  },
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
