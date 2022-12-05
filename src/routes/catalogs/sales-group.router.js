const express = require('express');

const SalesGroupService = require('./../../services/catalogs/sales-group.service');
const validatorHandler = require('./../../middlewares/validator.handler');
const { getSalesGroupSchema, createSalesGroupSchema, updateSalesGroupSchema } = require('../../schemas/catalogs/sales-group.schema');

const router = express.Router();
const service = new SalesGroupService();

// List all sales group
router.get('/', async(req, res, next)=>{
  try{

    const productTypes = await service.find();
    res.json(productTypes);

  }catch(error){
    next(error);
  }
});

// find by Id
router.get('/:id',
    validatorHandler(getSalesGroupSchema, 'params'),
  async(req, res, next) =>{
    try{

      const { id }  = req.params;
      const salesGroup = await service.findOne(id);
      res.json(salesGroup);

    }catch(error){
      next(error);
    }
  });

// Create sales group
router.post('/',
    validatorHandler(createSalesGroupSchema, 'body'),
    async(req, res, next) => {

      try{
        const body = req.body;
        const newSalesGroup = await service.create(body);
        res.status(201).json(newSalesGroup);

      }catch(error){
        next(error);
      }

    });


router.patch('/:id',
    validatorHandler(getSalesGroupSchema, 'params'),
    validatorHandler(updateSalesGroupSchema, 'body'),
    async(req, res, next) =>{
      try{
        const {id} = req.params;
        const body = req.body;
        const salesGroup = await service.update(id, body);

        res.json(salesGroup);

      }catch(error){
         next(error);
      }
    });


router.delete('/:id',
    validatorHandler(getSalesGroupSchema, 'params'),
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
