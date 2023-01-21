const boom  = require('@hapi/boom');

const { models } = require('./../../libs/sequelize');

class CompanyEmployeeService{

  constructor(){
    // construct
  }

  async create(data){
    const newCompanyEmployee = await models.CompanyEmployee.create(data);
    return newCompanyEmployee;
  }

  async find(){
    const companyEmployees = await models.CompanyEmployee.findAll();

    return companyEmployees;
  }

  async findOne(id){
    const companyEmployee = await models.CompanyEmployee.findByPk(id);
    if(!companyEmployee){
     throw boom.notFound('Company Employee not found');
    }
    return companyEmployee;
  }

  async update(id, changes){
     const companyEmployee = this.findOne(id);
     const resp = (await companyEmployee).update(changes);

     return resp;
  }

  async delete(id){
    const companyEmployee = this.findOne(id);
    (await companyEmployee).destroy();

    return {id};
  }


}

module.exports =  CompanyEmployeeService;
