const express = require('express');

const AcademicDegrees = require('./../services/academic-degrees.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { getAcademicDegreeSchema, createAcademicDegreeSchema, updateAcademicDegreeSchema } = require('../schemas/academic-degrees.schemas');

const router = express.Router();
const service = new AcademicDegrees();

// List all AcedemicDegree
router.get('/', async(req, res, next)=>{
  try{

    const academicDegrees = await service.find();
    res.json(academicDegrees);

  }catch(error){
    next(error);
  }
});

// find by Id
router.get('/:id',
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
