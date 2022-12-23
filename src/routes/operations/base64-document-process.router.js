const express = require('express');
const ProcessDocumentService = require('./../../services/operations/process-document.service');
const validatorHandler = require('./../../middlewares/validator.handler');
const { setDocumentB64Schema } = require('../../schemas/operations/documentB64.schema');
const {checkRoles} = require('./../../middlewares/auth.handler');

const router = express.Router();
const service = new ProcessDocumentService();
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
        if(saveDocument){
          res.status(201).json({"Message":"File upload success"});
        }

      }catch(error){
        next(error);
      }

    });


module.exports = router
