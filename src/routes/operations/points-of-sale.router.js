const express = require('express');

const PointsOfSaleService = require('../../services/operations/points-of-sale.service');
const validatorHandler = require('../../middlewares/validator.handler');
const { getPointOfSaleSchema, createPointOfSaleSchema, updatePointOfSaleSchema } = require('../../schemas/operations/pointsOfSale.schema');
const {checkRoles} = require('../../middlewares/auth.handler');
const passport = require('passport');

const router = express.Router();
const service = new PointsOfSaleService();

// List all sales group
router.get('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
async(req, res, next)=>{
  try{

    const pointOfSale = await service.find();
    res.json(pointOfSale);

  }catch(error){
    next(error);
  }
});

// find by Id
router.get('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(getPointOfSaleSchema, 'params'),
  async(req, res, next) =>{
    try{

      const { id }  = req.params;
      const pointOfSale = await service.findOne(id);
      res.json(pointOfSale);

    }catch(error){
      next(error);
    }
  });

// Create pointOfSale
router.post('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(createPointOfSaleSchema, 'body'),
    async(req, res, next) => {

      try{
        const body = req.body;
        const pointOfSale = await service.create(body);
        res.status(201).json(pointOfSale);

      }catch(error){
        next(error);
      }

    });


router.patch('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(getPointOfSaleSchema, 'params'),
    validatorHandler(updatePointOfSaleSchema, 'body'),
    async(req, res, next) =>{
      try{
        const {id} = req.params;
        const body = req.body;
        const pointOfSale = await service.update(id, body);

        res.json(pointOfSale);

      }catch(error){
         next(error);
      }
    });


router.delete('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1),
    validatorHandler(getPointOfSaleSchema, 'params'),
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
