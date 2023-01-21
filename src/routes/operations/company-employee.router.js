const express = require('express');

const CompanyEmployeeService = require('../../services/operations/company-employees.service');
const validatorHandler = require('../../middlewares/validator.handler');
const { getEmployeePointsCollectSchema, createEmployeePointsCollectSchema, updateEmployeePointsCollectSchema } = require('../../schemas/operations/companyEployees.schmea');
const {checkRoles} = require('../../middlewares/auth.handler');
const passport = require('passport');

const router = express.Router();
const service = new CompanyEmployeeService();

// List all sales group
router.get('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
async(req, res, next)=>{
  try{

    const employeePoints = await service.find();
    res.json(employeePoints);

  }catch(error){
    next(error);
  }
});

// find by Id
router.get('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(getEmployeePointsCollectSchema, 'params'),
  async(req, res, next) =>{
    try{

      const { id }  = req.params;
      const employeePoint = await service.findOne(id);
      res.json(employeePoint);

    }catch(error){
      next(error);
    }
  });

// Create employeePoint
router.post('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(createEmployeePointsCollectSchema, 'body'),
    async(req, res, next) => {

      try{
        const body = req.body;
        const employeePoint = await service.create(body);
        res.status(201).json(employeePoint);

      }catch(error){
        next(error);
      }

    });


router.patch('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1),
    validatorHandler(getEmployeePointsCollectSchema, 'params'),
    validatorHandler(updateEmployeePointsCollectSchema, 'body'),
    async(req, res, next) =>{
      try{
        const {id} = req.params;
        const body = req.body;
        const employeePoint = await service.update(id, body);

        res.json(employeePoint);

      }catch(error){
         next(error);
      }
    });


router.delete('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1),
    validatorHandler(getEmployeePointsCollectSchema, 'params'),
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
