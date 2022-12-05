const Joi = require('joi');

const id            = Joi.number().integer();
const name          = Joi.string().min(3);
const digipoints    = Joi.number().positive().integer();
const price         = Joi.number().positive().precision(2);
const imagePath     = Joi.string().min(20);
const status        = Joi.boolean();
const description   = Joi.string().min(10).max(600);
const apiKey        = Joi.string().min(10).max(255);
const apiUri        = Joi.string().uri();


const createAwardSchema = Joi.object({
  name:         name.required(),
  digipoints:   digipoints.required(),
  price:        price.required(),
  imagePath:    imagePath.required(),
  status:       status,
  description:  description.required(),
  apiKey:       apiKey,
  apiUri:       apiUri
});


const updateAwardSchema = Joi.object({
  name:        name,
  digipoints:  digipoints,
  price:       price,
  imagePath:   imagePath,
  status:      status,
  description: description,
  apiKey:      apiKey,
  apiUri:      apiUri

});


const getAwardSchema = Joi.object({
  id:id.required()
})

module.exports = { createAwardSchema, updateAwardSchema, getAwardSchema };
