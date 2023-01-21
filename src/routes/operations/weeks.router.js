const express = require('express');

const WeekService = require('../../services/operations/weeks.service');
const validatorHandler = require('../../middlewares/validator.handler');
const { getWeekSchema, createWeekSchema, updateWeekSchema } = require('../../schemas/operations/weeks.schema');
const {checkRoles} = require('../../middlewares/auth.handler');
const passport = require('passport');

const router = express.Router();
const service = new WeekService();

// List all sales group
router.get('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
async(req, res, next)=>{
  try{

    const week = await service.find();
    res.json(week);

  }catch(error){
    next(error);
  }
});

// find by Id
router.get('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(getWeekSchema, 'params'),
  async(req, res, next) =>{
    try{

      const { id }  = req.params;
      const week = await service.findOne(id);
      res.json(week);

    }catch(error){
      next(error);
    }
  });

// Create week
router.post('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(createWeekSchema, 'body'),
    async(req, res, next) => {

      try{
        const body = req.body;
        const week = await service.create(body);
        res.status(201).json(week);

      }catch(error){
        next(error);
      }

    });


router.patch('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1),
    validatorHandler(getWeekSchema, 'params'),
    validatorHandler(updateWeekSchema, 'body'),
    async(req, res, next) =>{
      try{
        const {id} = req.params;
        const body = req.body;
        const week = await service.update(id, body);

        res.json(week);

      }catch(error){
         next(error);
      }
    });


router.delete('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1),
    validatorHandler(getWeekSchema, 'params'),
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
