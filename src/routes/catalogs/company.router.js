const express = require('express');

const CompanyService = require('../../services/catalogs/company.service');
const validatorHandler = require('../../middlewares/validator.handler');
const { getCompanySchema, createCompanySchema, updateCompanySchema } = require('../../schemas/catalogs/company.schema');
const {checkRoles} = require('./../../middlewares/auth.handler');
const passport = require('passport');

const router = express.Router();
const service = new CompanyService();

// List all company
router.get('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
async(req, res, next)=>{
  try{

    const companies = await service.find();
    res.json(companies);

  }catch(error){
    next(error);
  }
});

// find by Id
router.get('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(getCompanySchema, 'params'),
  async(req, res, next) =>{
    try{

      const { id }  = req.params;
      const company = await service.findOne(id);
      res.json(company);

    }catch(error){
      next(error);
    }
  });

// Create company
router.post('/',
passport.authenticate('jwt', {session:false}),
checkRoles(1,2),
    validatorHandler(createCompanySchema, 'body'),
    async(req, res, next) => {

      try{
        const body = req.body;
        const newCompany = await service.create(body);
        res.status(201).json(newCompany);

      }catch(error){
        next(error);
      }

    });

// update company
router.patch('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1),
    validatorHandler(getCompanySchema, 'params'),
    validatorHandler(updateCompanySchema, 'body'),
    async(req, res, next) =>{
      try{
        const {id} = req.params;
        const body = req.body;
        const company = await service.update(id, body);

        res.json(company);

      }catch(error){
         next(error);
      }
    });

// delete company
router.delete('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles(1),
    validatorHandler(getCompanySchema, 'params'),
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
