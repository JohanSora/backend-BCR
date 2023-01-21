const express = require('express');

const RuleService = require('./../../services/operations/rules.service');
const validatorHandler = require('./../../middlewares/validator.handler');
const { getRuleSchema, createRuleSchema, updateRuleSchema } = require('../../schemas/operations/rules.schema');
const {checkRoles} = require('./../../middlewares/auth.handler');
const passport = require('passport');

const router = express.Router();
const service = new RuleService();

// List all sales group
router.get('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
async(req, res, next)=>{
  try{

    const rule = await service.find();
    res.json(rule);

  }catch(error){
    next(error);
  }
});

// find by Id
router.get('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(getRuleSchema, 'params'),
  async(req, res, next) =>{
    try{

      const { id }  = req.params;
      const rule = await service.findOne(id);
      res.json(rule);

    }catch(error){
      next(error);
    }
  });

// Create rule
router.post('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(createRuleSchema, 'body'),
    async(req, res, next) => {

      try{
        const body = req.body;
        const rule = await service.create(body);
        res.status(201).json(rule);

      }catch(error){
        next(error);
      }

    });


router.patch('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1),
    validatorHandler(getRuleSchema, 'params'),
    validatorHandler(updateRuleSchema, 'body'),
    async(req, res, next) =>{
      try{
        const {id} = req.params;
        const body = req.body;
        const rule = await service.update(id, body);

        res.json(rule);

      }catch(error){
         next(error);
      }
    });


router.delete('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1),
    validatorHandler(getRuleSchema, 'params'),
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
