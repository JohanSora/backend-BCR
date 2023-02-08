const express = require('express');

const SpecialAssignService = require('./../../services/operations/special-assign.service');
const validatorHandler = require('./../../middlewares/validator.handler');
const { createSpecialAssignSchema } = require('../../schemas/operations/special-assign.schema');
const {checkRoles} = require('./../../middlewares/auth.handler');
const passport = require('passport');

const router = express.Router();
const service = new SpecialAssignService();



// Create rule
router.post('/behavior',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(createSpecialAssignSchema, 'body'),
    async(req, res, next) => {

      try{
        const body = req.body;
        const rule = await service.create(body);
        res.status(201).json(rule);

      }catch(error){
        next(error);
      }

    });


router.post('/promotion',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(createSpecialAssignSchema, 'body'),
    async(req, res, next) => {

      try{
        const body = req.body;
        const rule = await service.createAssignByPromotion(body);
        res.status(201).json(rule);

      }catch(error){
        next(error);
      }

    });




module.exports = router
