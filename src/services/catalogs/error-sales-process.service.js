const boom  = require('@hapi/boom');

const { models } = require('../../libs/sequelize');

class ErrorSalesProcessService{

  constructor(){
    // construct
  }

  async create(data){
    const newErrorSalesProcess = await models.ErrorSalesProcess.create(data);
    return newErrorSalesProcess;
  }

  async find(){
    const errorSalesProcess = await models.ErrorSalesProcess.findAll();

    return errorSalesProcess;
  }

  async findOne(id){
    const errorSalesProcess = await models.ErrorSalesProcess.findByPk(id);
    if(!errorSalesProcess){
     throw boom.notFound('Error Sales Process not found');
    }
    return errorSalesProcess;
  }

  async update(id, changes){
     const errorSalesProcess = this.findOne(id);
     const resp = (await errorSalesProcess).update(changes);

     return resp;
  }

  async delete(id){
    const errorSalesProcess = this.findOne(id);
    (await errorSalesProcess).destroy();

    return {id};
  }


}

module.exports =  ErrorSalesProcessService;
