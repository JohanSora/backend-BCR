const express = require('express');

const StateService = require('./../../services/catalogs/state.service');
const validatorHandler = require('./../../middlewares/validator.handler');
const { getStateSchema, createStateSchema, updateStateSchema } = require('../../schemas/catalogs/state.schema');
const {checkRoles} = require('./../../middlewares/auth.handler');
const passport = require('passport');

const router = express.Router();
const service = new StateService();

// List all states
router.get('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
 async(req, res, next)=>{
  try{

    const states = await service.find();
    res.json(states);

  }catch(error){
    next(error);
  }
});

// find by Id
router.get('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(getStateSchema, 'params'),
  async(req, res, next) =>{
    try{

      const { id }  = req.params;
      const state = await service.findOne(id);
      res.json(state);

    }catch(error){
      next(error);
    }
  });

// Create state
router.post('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(createStateSchema, 'body'),
    async(req, res, next) => {

      try{
        const body = req.body;
        const newState = await service.create(body);
        res.status(201).json(newState);

      }catch(error){
        next(error);
      }

    });

// update state
router.patch('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1),
    validatorHandler(getStateSchema, 'params'),
    validatorHandler(updateStateSchema, 'body'),
    async(req, res, next) =>{
      try{
        const {id} = req.params;
        const body = req.body;
        const state = await service.update(id, body);

        res.json(state);

      }catch(error){
         next(error);
      }
    });

// delete state
router.delete('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1),
    validatorHandler(getStateSchema, 'params'),
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
