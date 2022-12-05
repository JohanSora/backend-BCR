const boom  = require('@hapi/boom');

const { models } = require('./../../libs/sequelize');

class OperationStatusService{

  constructor(){
    // construct
  }

  async create(data){
    const newOperationStatus = await models.OperationStatus.create(data);
    return newOperationStatus;
  }

  async find(){
    const operationStatus = await models.OperationStatus.findAll();

    return operationStatus;
  }

  async findOne(id){
    const operationStatus = await models.OperationStatus.findByPk(id);
    if(!operationStatus){
     throw boom.notFound('Operation Status not found');
    }
    return operationStatus;
  }

  async update(id, changes){
     const operationStatus = this.findOne(id);
     const resp = (await operationStatus).update(changes);

     return resp;
  }

  async delete(id){
    const operationStatus = this.findOne(id);
    (await operationStatus).destroy();

    return {id};
  }


}

module.exports =  OperationStatusService;
