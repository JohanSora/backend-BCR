const Joi = require('joi');

const id               = Joi.number().integer();
const base64String     = Joi.string().min(20);
const fileName         = Joi.string().min(5);

const setDocumentB64Schema = Joi.object({
  base64String:   base64String.required(),
  fileName:       fileName.required()
});


const updateDocumentB64Schema = Joi.object({
  base64String:   base64String,
  fileName:       fileName
});


const getDocumentB64Schema = Joi.object({
  id: id.required()
})

module.exports = {getDocumentB64Schema, setDocumentB64Schema, updateDocumentB64Schema }
