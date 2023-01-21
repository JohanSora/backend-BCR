const express = require('express');

const QuarterService = require('./../../services/operations/quarter.service');
const validatorHandler = require('./../../middlewares/validator.handler');
const { getQuartersSchema, createQuartersSchema, updateQuartersSchema } = require('../../schemas/operations/quarter.schema');
const {checkRoles} = require('./../../middlewares/auth.handler');
const passport = require('passport');

const router = express.Router();
const service = new QuarterService();

// List all sales group
router.get('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
async(req, res, next)=>{
  try{

    const quarter = await service.find();
    res.json(quarter);

  }catch(error){
    next(error);
  }
});

// find by Id
router.get('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(getQuartersSchema, 'params'),
  async(req, res, next) =>{
    try{

      const { id }  = req.params;
      const quarter = await service.findOne(id);
      res.json(quarter);

    }catch(error){
      next(error);
    }
  });

// Create quarter
router.post('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(createQuartersSchema, 'body'),
    async(req, res, next) => {

      try{
        const body = req.body;
        const quarter = await service.create(body);
        res.status(201).json(quarter);

      }catch(error){
        next(error);
      }

    });


router.patch('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1),
    validatorHandler(getQuartersSchema, 'params'),
    validatorHandler(updateQuartersSchema, 'body'),
    async(req, res, next) =>{
      try{
        const {id} = req.params;
        const body = req.body;
        const quarter = await service.update(id, body);

        res.json(quarter);

      }catch(error){
         next(error);
      }
    });


router.delete('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1),
    validatorHandler(getQuartersSchema, 'params'),
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
