const express = require('express');

const EmployeePointsCollectService = require('../../services/operations/employee-points.service');
const validatorHandler = require('../../middlewares/validator.handler');
const { getEmployeePointsCollectSchema, createEmployeePointsCollectSchema, updateEmployeePointsCollectSchema } = require('../../schemas/operations/eployeePointsCollect.schema');
const {checkRoles} = require('../../middlewares/auth.handler');
const passport = require('passport');

const router = express.Router();
const service = new EmployeePointsCollectService();

// List all sales group
router.get('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3,4,5),
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
checkRoles(1,2,3,4,5),
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

router.get('/by-user/:user',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3,4,5),
  async(req, res, next) =>{
    try{

      const { user }  = req.params;
      const employeePoint = await service.findByUser(user);
      res.json(employeePoint);

    }catch(error){
      next(error);
    }
  });




// Create employeePoint
router.post('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3,4,5),
    validatorHandler(createEmployeePointsCollectSchema, 'body'),
    async(req, res, next) => {

      try{
        const body = req.body;
        const employeePoint = await service.createBySalesId(body);
        res.status(201).json(employeePoint);

      }catch(error){
        next(error);
      }

    });


router.patch('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3,4,5),
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
