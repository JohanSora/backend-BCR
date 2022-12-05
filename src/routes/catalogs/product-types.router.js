const express = require('express');

const ProductTypeService = require('./../../services/catalogs/product-type.service');
const validatorHandler = require('./../../middlewares/validator.handler');
const { getProductTypeSchema, createProductTypeSchema, updateProductTypeSchema } = require('../../schemas/catalogs/product-type.schema');

const router = express.Router();
const service = new ProductTypeService();

// List all product types
router.get('/', async(req, res, next)=>{
  try{

    const salesGroup = await service.find();
    res.json(salesGroup);

  }catch(error){
    next(error);
  }
});

// find by Id
router.get('/:id',
    validatorHandler(getProductTypeSchema, 'params'),
  async(req, res, next) =>{
    try{

      const { id }  = req.params;
      const salesGroup = await service.findOne(id);
      res.json(salesGroup);

    }catch(error){
      next(error);
    }
  });

// Create product types
router.post('/',
    validatorHandler(createProductTypeSchema, 'body'),
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
    validatorHandler(getProductTypeSchema, 'params'),
    validatorHandler(updateProductTypeSchema, 'body'),
    async(req, res, next) =>{
      try{
        const {id} = req.params;
        const body = req.body;
        const productType = await service.update(id, body);

        res.json(productType);

      }catch(error){
         next(error);
      }
    });


router.delete('/:id',
    validatorHandler(getProductTypeSchema, 'params'),
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
