const express = require('express');

const RedeemAwardService = require('../../services/operations/redeem-awards.service');
const validatorHandler = require('../../middlewares/validator.handler');
const { getRedeemAwardsSchema, createRedeemAwardsSchema, updateRedeemAwardsSchema } = require('../../schemas/operations/redeemAwards.schema');
const {checkRoles} = require('../../middlewares/auth.handler');
const passport = require('passport');

const router = express.Router();
const service = new RedeemAwardService();

// List all sales group
router.get('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
async(req, res, next)=>{
  try{

    const redeemAwards = await service.find();
    res.json(redeemAwards);

  }catch(error){
    next(error);
  }
});

// find by Id
router.get('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(getRedeemAwardsSchema, 'params'),
  async(req, res, next) =>{
    try{

      const { id }  = req.params;
      const redeemAward = await service.findOne(id);
      res.json(redeemAward);

    }catch(error){
      next(error);
    }
  });

// Create redeemAward
router.post('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(createRedeemAwardsSchema, 'body'),
    async(req, res, next) => {

      try{
        const body = req.body;
        const redeemAward = await service.create(body);
        res.status(201).json(redeemAward);

      }catch(error){
        next(error);
      }

    });


router.patch('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1),
    validatorHandler(getRedeemAwardsSchema, 'params'),
    validatorHandler(updateRedeemAwardsSchema, 'body'),
    async(req, res, next) =>{
      try{
        const {id} = req.params;
        const body = req.body;
        const redeemAward = await service.update(id, body);

        res.json(redeemAward);

      }catch(error){
         next(error);
      }
    });


router.delete('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1),
    validatorHandler(getRedeemAwardsSchema, 'params'),
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
