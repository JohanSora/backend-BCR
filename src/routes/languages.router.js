const express = require('express');

const LanguageService = require('./../services/language.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { getLanguageSchema, createLanguageSchema, updateLanguageSchema } = require('../schemas/language.schema');

const router = express.Router();
const service = new LanguageService();

// List all Languages
router.get('/', async(req, res, next)=>{
  try{

    const languages = await service.find();
    res.json(languages);

  }catch(error){
    next(error);
  }
});

// find by Id
router.get('/:id',
    validatorHandler(getLanguageSchema, 'params'),
  async(req, res, next) =>{
    try{

      const { id }  = req.params;
      const language = await service.findOne(id);
      res.json(language);

    }catch(error){
      next(error);
    }
  });

// Create language
router.post('/',
    validatorHandler(createLanguageSchema, 'body'),
    async(req, res, next) => {

      try{
        const body = req.body;
        const newLanguage = await service.create(body);
        res.status(201).json(newLanguage);

      }catch(error){
        next(error);
      }

    });


router.patch('/:id',
    validatorHandler(getLanguageSchema, 'params'),
    validatorHandler(updateLanguageSchema, 'body'),
    async(req, res, next) =>{
      try{
        const {id} = req.params;
        const body = req.body;
        const language = await service.update(id, body);

        res.json(language);

      }catch(error){
         next(error);
      }
    });


router.delete('/:id',
    validatorHandler(getLanguageSchema, 'params'),
    async(req, res, next) =>{
      try{
        const {id} = req.params;
        await service.delete(id);
        res.status(201).json({id});

      }catch(error){
        next(error);
      }
    }

);

module.exports = router
