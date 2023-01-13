const express = require('express');

const AcademicDegreeService = require('../../services/catalogs/academic-degrees.service');
const validatorHandler = require('../../middlewares/validator.handler');
const { getAcademicDegreeSchema, createAcademicDegreeSchema, updateAcademicDegreeSchema } = require('../../schemas/catalogs/academic-degrees.schema');
const {checkRoles} = require('./../../middlewares/auth.handler');

const router = express.Router();
const service = new AcademicDegreeService();
const passport = require('passport');

// List all AcedemicDegree
router.get('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
async(req, res, next)=>{
  try{

    const academicDegrees = await service.find();
    res.json(academicDegrees);

  }catch(error){
    next(error);
  }
});

// find by Id
router.get('/:id',
  passport.authenticate('jwt', {session:false}),
    checkRoles(1,2),
    validatorHandler(getAcademicDegreeSchema, 'params'),
  async(req, res, next) =>{
    try{

      const { id }  = req.params;
      const acdemicDegree = await service.findOne(id);
      res.json(acdemicDegree);

    }catch(error){
      next(error);
    }
  });

// Create academicDegree
router.post('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(createAcademicDegreeSchema, 'body'),
    async(req, res, next) => {

      try{
        const body = req.body;
        const newAcademicDegree = await service.create(body);
        res.status(201).json(newAcademicDegree);

      }catch(error){
        next(error);
      }

    });


router.patch('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1),
    validatorHandler(getAcademicDegreeSchema, 'params'),
    validatorHandler(updateAcademicDegreeSchema, 'body'),
    async(req, res, next) =>{
      try{
        const {id} = req.params;
        const body = req.body;
        const academicDegree = await service.update(id, body);

        res.json(academicDegree);

      }catch(error){
         next(error);
      }
    });


router.delete('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1),
    validatorHandler(getAcademicDegreeSchema, 'params'),
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