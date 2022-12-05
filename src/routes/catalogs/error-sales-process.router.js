const express = require('express');

const ErrorSalesProcessService = require('../../services/catalogs/error-sales-process.service');
const validatorHandler = require('../../middlewares/validator.handler');
const { getErrorSalesProcessSchema, createErrorSalesProcessSchema, updateErrorSalesProcessSchema } = require('../../schemas/catalogs/error-sales-process.schema');

const router = express.Router();
const service = new ErrorSalesProcessService();

// List all Error Sales process
router.get('/', async(req, res, next)=>{
  try{

    const errorSalesProcess = await service.find();
    res.json(errorSalesProcess);

  }catch(error){
    next(error);
  }
});

// find by Id
router.get('/:id',
    validatorHandler(getErrorSalesProcessSchema, 'params'),
  async(req, res, next) =>{
    try{

      const { id }  = req.params;
      const errorSalesProcess = await service.findOne(id);
      res.json(errorSalesProcess);

    }catch(error){
      next(error);
    }
  });

// Create Error Sales process
router.post('/',
    validatorHandler(createErrorSalesProcessSchema, 'body'),
    async(req, res, next) => {

      try{
        const body = req.body;
        const newErrorSalesProcess = await service.create(body);
        res.status(201).json(newErrorSalesProcess);

      }catch(error){
        next(error);
      }

    });


router.patch('/:id',
    validatorHandler(getErrorSalesProcessSchema, 'params'),
    validatorHandler(updateErrorSalesProcessSchema, 'body'),
    async(req, res, next) =>{
      try{
        const {id} = req.params;
        const body = req.body;
        const errorSalesProcess = await service.update(id, body);

        res.json(errorSalesProcess);

      }catch(error){
         next(error);
      }
    });


router.delete('/:id',
    validatorHandler(getErrorSalesProcessSchema, 'params'),
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
