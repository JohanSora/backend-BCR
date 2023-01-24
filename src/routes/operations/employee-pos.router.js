const express = require('express');

const EmployeePosService = require('../../services/operations/employees-pos.service');
const validatorHandler = require('../../middlewares/validator.handler');
const { getEmployeePosSchema, createEmployeePosSchema, updateEmployeePosSchema } = require('../../schemas/operations/eployeesPos.schema');
const {checkRoles} = require('../../middlewares/auth.handler');
const passport = require('passport');

const router = express.Router();
const service = new EmployeePosService();

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
    validatorHandler(getEmployeePosSchema, 'params'),
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
    validatorHandler(createEmployeePosSchema, 'body'),
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
    validatorHandler(getEmployeePosSchema, 'params'),
    validatorHandler(updateEmployeePosSchema, 'body'),
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
    validatorHandler(getEmployeePosSchema, 'params'),
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
