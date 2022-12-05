const express = require('express');

const CityService = require('./../../services/catalogs/city.service');
const validatorHandler = require('./../../middlewares/validator.handler');
const { getCitySchema, createCitySchema, updateCitySchema } = require('../../schemas/catalogs/city.schema');

const router = express.Router();
const service = new CityService();

// List all country
router.get('/', async(req, res, next)=>{
  try{

    const countries = await service.find();
    res.json(countries);

  }catch(error){
    next(error);
  }
});

// find by Id
router.get('/:id',
    validatorHandler(getCitySchema, 'params'),
  async(req, res, next) =>{
    try{

      const { id }  = req.params;
      const country = await service.findOne(id);
      res.json(country);

    }catch(error){
      next(error);
    }
  });

// Create country
router.post('/',
    validatorHandler(createCitySchema, 'body'),
    async(req, res, next) => {

      try{
        const body = req.body;
        const newCountry = await service.create(body);
        res.status(201).json(newCountry);

      }catch(error){
        next(error);
      }

    });

// update country
router.patch('/:id',
    validatorHandler(getCitySchema, 'params'),
    validatorHandler(updateCitySchema, 'body'),
    async(req, res, next) =>{
      try{
        const {id} = req.params;
        const body = req.body;
        const country = await service.update(id, body);

        res.json(country);

      }catch(error){
         next(error);
      }
    });

// delete country
router.delete('/:id',
    validatorHandler(getCitySchema, 'params'),
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
