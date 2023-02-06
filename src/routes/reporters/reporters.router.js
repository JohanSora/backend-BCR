const express = require('express');

const ReporterService = require('../../services/reporters/reporter.service');
const validatorHandler = require('../../middlewares/validator.handler');
const { getRedeemAwardsSchema } = require('../../schemas/operations/redeemAwards.schema');
const {checkRoles} = require('../../middlewares/auth.handler');
const passport = require('passport');

const router = express.Router();
const service = new ReporterService();

// List all sales group
router.get('/no-assigned',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3,4,5),
async(req, res, next)=>{
  try{

    const salesNoAssigned = await service.getPointsNoAssign();
    res.json(salesNoAssigned);

  }catch(error){
    next(error);
  }
});

router.get('/assigned',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3,4,5),
async(req, res, next)=>{
  try{

    const salesAssigned = await service.getPointsAssign();
    res.json(salesAssigned);

  }catch(error){
    next(error);
  }
});

router.get('/digipoints-redeem-status/:type/:country',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3,4,5),
async(req, res, next)=>{
  try{

    const {type} = req.params;
    const {country} = req.params;
    const salesAssigned = await service.getDigipointsPending(type, country);
    res.json(salesAssigned);

  }catch(error){
    next(error);
  }
});






// find by Id
router.get('/selective-reporter/:quarter/:week/:saleType',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),

  async(req, res, next) =>{
    try{

      const {quarter} = req.params;
      const {week} = req.params;
      const {saleType} = req.params;

      const redeemAward = await service.salesWithParams(quarter,week, saleType);
      res.json(redeemAward);

    }catch(error){
      next(error);
    }
  });




module.exports = router
