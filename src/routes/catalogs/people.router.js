const express = require('express');

const PersonService = require('./../../services/catalogs/person.service');
const validatorHandler = require('./../../middlewares/validator.handler');
const { getPersonSchema, createPersonSchema, updatePersonSchema } = require('../../schemas/catalogs/person.schema');

const router = express.Router();
const service = new PersonService();

// List all People
router.get('/', async(req, res, next)=>{
  try{

    const people = await service.find();
    res.json(people);

  }catch(error){
    next(error);
  }
});

// find by Id
router.get('/:id',
    validatorHandler(getPersonSchema, 'params'),
  async(req, res, next) =>{
    try{

      const { id }  = req.params;
      const person = await service.findOne(id);
      res.json(person);

    }catch(error){
      next(error);
    }
  });

// Create Person
router.post('/',
    validatorHandler(createPersonSchema, 'body'),
    async(req, res, next) => {

      try{
        const body = req.body;
        const newPerson = await service.create(body);
        res.status(201).json(newPerson);

      }catch(error){
        next(error);
      }

    });

// update person
router.patch('/:id',
    validatorHandler(getPersonSchema, 'params'),
    validatorHandler(updatePersonSchema, 'body'),
    async(req, res, next) =>{
      try{
        const {id} = req.params;
        const body = req.body;
        const person = await service.update(id, body);

        res.json(person);

      }catch(error){
         next(error);
      }
    });

// delete Person
router.delete('/:id',
    validatorHandler(getPersonSchema, 'params'),
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
