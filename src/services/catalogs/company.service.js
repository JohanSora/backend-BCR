const boom  = require('@hapi/boom');

const { models } = require('./../../libs/sequelize');

class CompanyService{

  constructor(){
    // construct
  }

  async create(data){
    const newCompany = await models.Company.create(data);
    return newCompany;
  }

  async find(){

    const companies = await models.Company.findAll();
    return companies;

  }

  async findOne(id){

    const options = {
        include:[
            'operationStatus',
            'representative'
        ]
    };
    
    const company = await models.Company.findByPk(id, options);
    if(!company){
     throw boom.notFound('Company not found');
    }
    return company;
  }

  async update(id, changes){
     const company = this.findOne(id);
     const resp = (await company).update(changes);

     return resp;
  }

  async delete(id){

    const company = this.findOne(id);
    (await company).destroy();

    return {id};
  }


}

module.exports =  CompanyService;
