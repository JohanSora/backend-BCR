const express = require('express');

const OperationStatusService = require('./../../services/catalogs/operation-status.service');
const validatorHandler = require('./../../middlewares/validator.handler');
const { getOperationStatusSchema, createOperationStatusSchema, updateOperationStatusSchema } = require('../../schemas/catalogs/operation-status.schema');

const router = express.Router();
const service = new OperationStatusService();

// List all Operation Status
router.get('/', async(req, res, next)=>{
  try{

    const operationStatus = await service.find();
    res.json(operationStatus);

  }catch(error){
    next(error);
  }
});

// find by Id
router.get('/:id',
    validatorHandler(getOperationStatusSchema, 'params'),
  async(req, res, next) =>{
    try{

      const { id }  = req.params;
      const operationStatus = await service.findOne(id);
      res.json(operationStatus);

    }catch(error){
      next(error);
    }
  });

// Create Operation Status
router.post('/',
    validatorHandler(createOperationStatusSchema, 'body'),
    async(req, res, next) => {

      try{
        const body = req.body;
        const newOperationStatus = await service.create(body);
        res.status(201).json(newOperationStatus);

      }catch(error){
        next(error);
      }

    });


router.patch('/:id',
    validatorHandler(getOperationStatusSchema, 'params'),
    validatorHandler(updateOperationStatusSchema, 'body'),
    async(req, res, next) =>{
      try{
        const {id} = req.params;
        const body = req.body;
        const operationStatus = await service.update(id, body);

        res.json(operationStatus);

      }catch(error){
         next(error);
      }
    });


router.delete('/:id',
    validatorHandler(getOperationStatusSchema, 'params'),
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
