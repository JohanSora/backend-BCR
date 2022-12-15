const Joi = require('joi');

const id         = Joi.number().integer();
const name       = Joi.string().min(3);


const createRoleSchema = Joi.object({
  name:name.required(),
});


const updateRoleSchema = Joi.object({
  name:name,

});


const getRoleSchema = Joi.object({
  id:id.required()
})

module.exports = { createRoleSchema, updateRoleSchema, getRoleSchema };
