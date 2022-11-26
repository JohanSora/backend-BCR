const express = require('express');

const AwardService = require('./../services/award.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { getAwardSchema, createAwardSchema, updateAwardSchema } = require('../schemas/award.schema');

const router = express.Router();
const service = new AwardService();

// List all Awards
router.get('/', async(req, res, next)=>{
  try{

    const awards = await service.find();
    res.json(awards);

  }catch(error){
    next(error);
  }
});

// find by Id
router.get('/:id',
    validatorHandler(getAwardSchema, 'params'),
  async(req, res, next) =>{
    try{

      const { id }  = req.params;
      const award = await service.findOne(id);
      res.json(award);

    }catch(error){
      next(error);
    }
  });

// Create award
router.post('/',
    validatorHandler(createAwardSchema, 'body'),
    async(req, res, next) => {

      try{
        const body = req.body;
        const newAward = await service.create(body);
        res.status(201).json(newAward);

      }catch(error){
        next(error);
      }

    });

// update award
router.patch('/:id',
    validatorHandler(getAwardSchema, 'params'),
    validatorHandler(updateAwardSchema, 'body'),
    async(req, res, next) =>{
      try{
        const {id} = req.params;
        const body = req.body;
        const award = await service.update(id, body);

        res.json(award);

      }catch(error){
         next(error);
      }
    });

// delete award
router.delete('/:id',
    validatorHandler(getAwardSchema, 'params'),
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