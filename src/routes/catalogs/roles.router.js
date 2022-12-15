const express = require('express');

const RoleService = require('./../../services/catalogs/role.service');
const validatorHandler = require('./../../middlewares/validator.handler');
const { getRoleSchema, createRoleSchema, updateRoleSchema } = require('../../schemas/catalogs/role.schema');
const {checkRoles} = require('./../../middlewares/auth.handler');
const passport = require('passport');

const router = express.Router();
const service = new RoleService();

// List all roles
router.get('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
async(req, res, next)=>{
  try{

    const roles = await service.find();
    res.json(roles);

  }catch(error){
    next(error);
  }
});

// find by Id
router.get('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(getRoleSchema, 'params'),
  async(req, res, next) =>{
    try{

      const { id }  = req.params;
      const role = await service.findOne(id);
      res.json(role);

    }catch(error){
      next(error);
    }
  });

// Create roles
router.post('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(createRoleSchema, 'body'),
    async(req, res, next) => {

      try{
        const body = req.body;
        const newRole = await service.create(body);
        res.status(201).json(newRole);

      }catch(error){
        next(error);
      }

    });

// update roles
router.patch('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1),
    validatorHandler(getRoleSchema, 'params'),
    validatorHandler(updateRoleSchema, 'body'),
    async(req, res, next) =>{
      try{
        const {id} = req.params;
        const body = req.body;
        const role = await service.update(id, body);

        res.json(role);

      }catch(error){
         next(error);
      }
    });

// delete roles
router.delete('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1),
    validatorHandler(getRoleSchema, 'params'),
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
