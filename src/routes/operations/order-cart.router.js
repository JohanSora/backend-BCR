const express = require('express');

const OrderCartService = require('../../services/operations/order-cart.service');
const validatorHandler = require('../../middlewares/validator.handler');
const { getOrderCartSchema, createOrderCartSchema, updateOrderCartSchema } = require('../../schemas/operations/order-cart.schema');
const {checkRoles} = require('../../middlewares/auth.handler');
const passport = require('passport');

const router = express.Router();
const service = new OrderCartService();

router.get('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3,4,5),
async(req, res, next)=>{
  try{

    const orderCarts = await service.find();
    res.json(orderCarts);

  }catch(error){
    next(error);
  }
});

// find by Id
router.get('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3,4,5),
    validatorHandler(getOrderCartSchema, 'params'),
  async(req, res, next) =>{
    try{

      const { id }  = req.params;
      const orderCart = await service.findOne(id);
      res.json(orderCart);

    }catch(error){
      next(error);
    }
  });


// Create orderCart
router.post('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3,4,5),
    validatorHandler(createOrderCartSchema, 'body'),
    async(req, res, next) => {

      try{
        const body = req.body;
        const orderCarts = await service.createProcess(body);
        res.status(201).json(orderCarts);

      }catch(error){
        next(error);
      }

    });


 router.patch('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,5),
    validatorHandler(getOrderCartSchema, 'params'),
    validatorHandler(updateOrderCartSchema, 'body'),
    async(req, res, next) =>{
      try{
        const {id} = req.params;
        const body = req.body;
        const orderCart = await service.update(id, body);

        res.json(orderCart);

      }catch(error){
         next(error);
      }
    });


router.delete('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,3,4,5),
    validatorHandler(getOrderCartSchema, 'params'),
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
