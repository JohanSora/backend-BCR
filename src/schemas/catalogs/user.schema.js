const Joi = require('joi');

const id         = Joi.number().integer();
const name = Joi.string().min(3);
const email = Joi.string().email();
const password = Joi.string().min(8);
const recoveryToken = Joi.string().min(5);
const profilePhotoPath = Joi.string().min(5);
const roleId = Joi.number().integer();


const createUserSchema = Joi.object({
  name:name.required(),
  email:email.required(),
  password:password.required(),
  recoveryToken:recoveryToken,
  profilePhotoPath:profilePhotoPath,
  roleId:roleId.required()

});


const updateUserSchema = Joi.object({
  name:name,
  email:email,
  password:password,
  recoveryToken:recoveryToken,
  profilePhotoPath:profilePhotoPath,
  roleId:roleId,

});


const getUserSchema = Joi.object({
  id:id.required()
})

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
