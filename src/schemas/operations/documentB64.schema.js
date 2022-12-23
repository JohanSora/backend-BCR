const Joi = require('joi');

const base64String = Joi.string().min(20);
const fileName = Joi.string().min(5);

const setDocumentB64Schema = Joi.object({
  base64String: base64String.required(),
  fileName: fileName.required()
});

module.exports = { setDocumentB64Schema }
