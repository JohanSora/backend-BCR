const boom  = require('@hapi/boom');

const { models } = require('./../../libs/sequelize');

class EmployeePointsCollectService{

  constructor(){
    // construct
  }

  async create(data){
    const newEmployeePointCollect = await models.EmployeePointsCollect.create(data);
    return newEmployeePointCollect;
  }

  async find(){

    const EmployeePointCollect = await models.EmployeePointsCollect.findAll();

    return EmployeePointCollect;
  }

  async findOne(id){

    const EmployeePointCollect = await models.EmployeePointsCollect.findByPk(id);
    if(!EmployeePointCollect){
     throw boom.notFound('Eployee points collect not found');
    }
    return EmployeePointCollect;
  }

  async update(id, changes){
     const EmployeePointsCollect = this.findOne(id);
     const resp = (await EmployeePointsCollect).update(changes);

     return resp;
  }

  async delete(id){
    const EmployeePointsCollect = this.findOne(id);
    (await EmployeePointsCollect).destroy();

    return {id};
  }


}

module.exports =  EmployeePointsCollectService;
