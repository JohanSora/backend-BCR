const express = require('express');

const SalesService = require('../../services/operations/sales.service');
const validatorHandler = require('../../middlewares/validator.handler');
const { getSaleSchema, updateSaleSchema } = require('../../schemas/operations/sale.schema');
const {checkRoles} = require('../../middlewares/auth.handler');
const passport = require('passport');

const router = express.Router();
const service = new SalesService();


// List all sales group
router.get('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
async(req, res, next)=>{
  try{

    const rule = await service.find();
    res.json(rule);

  }catch(error){
    next(error);
  }
});

router.get('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(getSaleSchema, 'params'),
  async(req, res, next) =>{
    try{

      const { id }  = req.params;
      const rule = await service.findOne(id);
      res.json(rule);

    }catch(error){
      next(error);
    }
  });


router.patch('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(getSaleSchema, 'params'),
    validatorHandler(updateSaleSchema, 'body'),
    async(req, res, next) =>{
      try{
        const {id} = req.params;
        const body = req.body;
        const salesUpdate = await service.update(id, body);

        res.json(salesUpdate);

      }catch(error){
         next(error);
      }
    });


module.exports = router
