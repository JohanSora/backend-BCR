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

// List all sales by week and sales type (TM, IN)
router.get('/sales-by-week-and-stype',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3,4,5),
async(req, res, next)=>{
  try{

    const getSalesByWeekAndStype = await service.getSalesByWeekAndStype();
    res.json(getSalesByWeekAndStype);

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

router.get('/assigned/:emailuser',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3,4,5),
async(req, res, next)=>{
  try{
    let {emailuser} = req.params;
    const salesAssigned = await service.getPointsAssignByUser(emailuser);
    res.json(salesAssigned);

  }catch(error){
    next(error);
  }
});

router.get('/digipoints-redeem-status/:type/:country/:userEmployeeId',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3,4,5),
async(req, res, next)=>{
  try{

    const {type} = req.params;
    const {country} = req.params;
    const {userEmployeeId} = req.params;
    const salesAssigned = await service.getDigipointsPending(type, country, userEmployeeId);
    res.json(salesAssigned);

  }catch(error){
    next(error);
  }
});

router.get('/digipoints-redeem-status-all/:type/:country/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3,4,5),
async(req, res, next)=>{
  try{

    const {type} = req.params;
    const {country} = req.params;
    const salesAssigned = await service.getDigipointsPendingAll(type, country);
    res.json(salesAssigned);

  }catch(error){
    next(error);
  }
});

router.get('/redeem',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3,4,5),
async(req, res, next)=>{
  try{
    const salesAssigned = await service.getRedeemAll();
    res.json(salesAssigned);
  }catch(error){
    next(error);
  }
});

router.get('/userspolicy',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3,4,5),
async(req, res, next)=>{
  try{
    const salesAssigned = await service.getUsersPolicyAll();
    res.json(salesAssigned);
  }catch(error){
    next(error);
  }
});

router.get('/digistatus',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3,4,5),
async(req, res, next)=>{
  try{
    const salesAssigned = await service.getDigiStatus();
    res.json(salesAssigned);
  }catch(error){
    next(error);
  }
});

router.get('/promousers',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3,4,5),
async(req, res, next)=>{
  try{
    const salesAssigned = await service.getDigiByPromoPerUser();
    res.json(salesAssigned);
  }catch(error){
    next(error);
  }
});

router.get('/promo',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3,4,5),
async(req, res, next)=>{
  try{
    const salesAssigned = await service.getDigiByPromo();
    res.json(salesAssigned);
  }catch(error){
    next(error);
  }
});

router.get('/behavioruser',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3,4,5),
async(req, res, next)=>{
  try{
    const salesAssigned = await service.getDigiByBehaPerUser();
    res.json(salesAssigned);
  }catch(error){
    next(error);
  }
});

router.get('/behavior',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3,4,5),
async(req, res, next)=>{
  try{
    const salesAssigned = await service.getDigiByBeha();
    res.json(salesAssigned);
  }catch(error){
    next(error);
  }
});

router.get('/salesbysegment',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3,4,5),
async(req, res, next)=>{
  try{
    const salesAssigned = await service.getSalesBySegment();
    res.json(salesAssigned);
  }catch(error){
    next(error);
  }
});


// find by Id
router.get('/selective-reporter/:quarter/:week/:saleType',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3,4,5),

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





  // get error salses file
router.get('/error-file',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
async(req, res, next)=>{
  try{

    const errorFileData = await service.getErrorFile();
    res.json(errorFileData);

  }catch(error){
    next(error);
  }
});




module.exports = router
