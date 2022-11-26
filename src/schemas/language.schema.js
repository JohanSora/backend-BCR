const Joi = require('joi');

const id        = Joi.number().integer();
const name      = Joi.string().min(3);
const codeLang  = Joi.string().min(2);

const createLanguageSchema = Joi.object({
  name:     name.required(),
  codeLang: codeLang.required()

});


const updateLanguageSchema = Joi.object({
  name:     name,
  codeLang: codeLang
});


const getLanguageSchema = Joi.object({
  id:id.required()
})

module.exports = { createLanguageSchema, updateLanguageSchema, getLanguageSchema };
