const express = require('express');

const CountryService = require('../../services/catalogs/country.service');
const validatorHandler = require('../../middlewares/validator.handler');
const { getCountrySchema, createCountrySchema, updateCountrySchema } = require('../../schemas/catalogs/country.schema');
const {checkRoles} = require('./../../middlewares/auth.handler');
const passport = require('passport');

const router = express.Router();
const service = new CountryService();

// List all country
router.get('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
async(req, res, next)=>{
  try{

    const countries = await service.find();
    res.json(countries);

  }catch(error){
    next(error);
  }
});

// find by Id
router.get('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(getCountrySchema, 'params'),
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
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(createCountrySchema, 'body'),
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
passport.authenticate('jwt', {session:false}),
checkRoles(1),
    validatorHandler(getCountrySchema, 'params'),
    validatorHandler(updateCountrySchema, 'body'),
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
passport.authenticate('jwt', {session:false}),
checkRoles(1),
    validatorHandler(getCountrySchema, 'params'),
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
