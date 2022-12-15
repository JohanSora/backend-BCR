const express = require('express');

const FiscalPeriodService = require('../../services/catalogs/fiscal-period.service');
const validatorHandler = require('../../middlewares/validator.handler');
const { getFiscalPeriodSchema, createFiscalPeriodSchema, updateFiscalPeriodSchema } = require('../../schemas/catalogs/fiscal-period.schema');
const {checkRoles} = require('./../../middlewares/auth.handler');
const passport = require('passport');

const router = express.Router();
const service = new FiscalPeriodService();

// List all fiscalPeriod
router.get('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
async(req, res, next)=>{
  try{

    const fiscalPeriods = await service.find();
    res.json(fiscalPeriods);

  }catch(error){
    next(error);
  }
});

// find by Id
router.get('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(getFiscalPeriodSchema, 'params'),
  async(req, res, next) =>{
    try{

      const { id }  = req.params;
      const fiscalPeriod = await service.findOne(id);
      res.json(fiscalPeriod);

    }catch(error){
      next(error);
    }
  });

// Create fiscal Period
router.post('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(createFiscalPeriodSchema, 'body'),
    async(req, res, next) => {

      try{
        const body = req.body;
        const newFiscalPeriod = await service.create(body);
        res.status(201).json(newFiscalPeriod);

      }catch(error){
        next(error);
      }

    });

// update fiscal Period
router.patch('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1),
    validatorHandler(getFiscalPeriodSchema, 'params'),
    validatorHandler(updateFiscalPeriodSchema, 'body'),
    async(req, res, next) =>{
      try{
        const {id} = req.params;
        const body = req.body;
        const fiscalPeriod = await service.update(id, body);

        res.json(fiscalPeriod);

      }catch(error){
         next(error);
      }
    });

// delete fiscal Period
router.delete('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1),
    validatorHandler(getFiscalPeriodSchema, 'params'),
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
