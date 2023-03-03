const express = require('express');

const ProductService = require('./../../services/catalogs/product.service');
const validatorHandler = require('./../../middlewares/validator.handler');
const { getProductSchema, createProductSchema, updateProductSchema } = require('../../schemas/catalogs/product.schema');
const {checkRoles} = require('./../../middlewares/auth.handler');
const passport = require('passport');

const router = express.Router();
const service = new ProductService();

// List all product types
router.get('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3),
async(req, res, next)=>{
  try{

    const Product = await service.find();
    res.json(Product);

  }catch(error){
    next(error);
  }
});

// find by Id
router.get('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3),
    validatorHandler(getProductSchema, 'params'),
  async(req, res, next) =>{
    try{

      const { id }  = req.params;
      const Product = await service.findOne(id);
      res.json(Product);

    }catch(error){
      next(error);
    }
  });

// Create product types
router.post('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3),
    validatorHandler(createProductSchema, 'body'),
    async(req, res, next) => {

      try{
        const body = req.body;
        const newProduct = await service.create(body);
        res.status(201).json(newProduct);

      }catch(error){
        next(error);
      }

    });


router.patch('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3),
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    async(req, res, next) =>{
      try{
        const {id} = req.params;
        const body = req.body;
        const product = await service.update(id, body);

        res.json(product);

      }catch(error){
         next(error);
      }
    });


router.delete('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3),
    validatorHandler(getProductSchema, 'params'),
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
