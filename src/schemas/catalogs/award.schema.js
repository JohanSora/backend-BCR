const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);
const digipoints = Joi.number().positive().integer();
const price = Joi.number().positive().precision(2);
const imagePath = Joi.string().min(10);
const status = Joi.boolean();
const description = Joi.string().min(1).max(600);
const apiKey = Joi.string().min(10).max(255);
const apiUri = Joi.string().uri();
const imagePathSecond = Joi.string().min(10);

const createAwardSchema = Joi.object({
  name: name.required(),
  digipoints: digipoints.required(),
  price: price.required(),
  imagePath: imagePath.required(),
  imagePathSecond: imagePathSecond,
  status: status,
  description: description.required(),
  apiKey: apiKey,
  apiUri: apiUri,
});

const updateAwardSchema = Joi.object({
  name: name,
  digipoints: digipoints,
  price: price,
  imagePath: imagePath,
  imagePathSecond: imagePathSecond,
  status: status,
  description: description,
  apiKey: apiKey,
  apiUri: apiUri,
});

const getAwardSchema = Joi.object({
  id: id.required(),
});

module.exports = { createAwardSchema, updateAwardSchema, getAwardSchema };
