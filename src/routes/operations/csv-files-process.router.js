const express           = require('express');

const CsvFilesProcess               = require('../../services/operations/csv-files-process.service');
const validatorHandler              = require('../../middlewares/validator.handler');
const {  getCsvFileProcessSchema }  = require('../../schemas/operations/csv-files-process.schema');
const {checkRoles}                  = require('../../middlewares/auth.handler');
const passport                      = require('passport');

const router = express.Router();
const service = new CsvFilesProcess();

// List all sales group
/* router.get('/',
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

    }); */

router.get('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
async(req, res, next)=>{
  try{

    const employeePoints = await service.find();
    res.json(employeePoints);

  }catch(error){
    next(error);
  }
});

router.get('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2,5),
    validatorHandler(getCsvFileProcessSchema, 'params'),
    async(req, res, next) =>{
      try{
        const {id} = req.params;

        const csvFilesProcess = await service.processSales(parseInt(id));

        res.json(csvFilesProcess);

      }catch(error){
         next(error);
      }
    });



module.exports = router
