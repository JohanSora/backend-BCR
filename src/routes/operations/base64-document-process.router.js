const express = require('express');
const ProcessDocumentService = require('./../../services/operations/process-document.service');
const CsvFileService = require('./../../services/operations/csv-files-process.service');
const validatorHandler = require('./../../middlewares/validator.handler');
const { setDocumentB64Schema, getDocumentB64Schema } = require('../../schemas/operations/documentB64.schema');
const {checkRoles} = require('./../../middlewares/auth.handler');

const router = express.Router();
const service = new ProcessDocumentService();
const CsvService = new CsvFileService();
const passport = require('passport');


// Create User
router.post('/document',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(setDocumentB64Schema, 'body'),
    async(req, res, next) => {

      try{
        const body = req.body;
        const saveDocument = await service.converAndSaveFile(body);
        //console.log(saveDocument);
        if(saveDocument){
          res.status(201).json({"Message":"File upload success "});
        }

      }catch(error){
        next(error);
      }

    });


// find by Id
router.get('/get-list',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
async(req, res, next)=>{
  try{

    const employeePoints = await CsvService.find();
    res.json(employeePoints);

  }catch(error){
    next(error);
  }
});

router.get('/get-list/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
  validatorHandler(getDocumentB64Schema, 'params'),
async(req, res, next)=>{
  try{

    const { id } = req.params;
    const processSales = await service.processSales(id);
    res.json(processSales);

  }catch(error){
    next(error);
  }
});


module.exports = router
