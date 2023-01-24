const boom  = require('@hapi/boom');

const { models } = require('../../libs/sequelize');

class EmployeePosService{

  constructor(){
    // construct
  }

  async create(data){
    const newEmployeePos = await models.EmployeePos.create(data);
    return newEmployeePos;
  }

  async find(){
    const EmployeePos = await models.EmployeePos.findAll();

    return EmployeePos;
  }

  async findOne(id){
    const EmployeePos = await models.EmployeePos.findByPk(id);
    if(!EmployeePos){
     throw boom.notFound('Company Employee not found');
    }
    return EmployeePos;
  }

  async findByUserId(id){
    const data = await models.EmployeePos.findOne({
      where:{employeeId: id}
    });

    return data;
  }

  async update(id, changes){
     const EmployeePos = this.findOne(id);
     const resp = (await EmployeePos).update(changes);

     return resp;
  }

  async delete(id){
    const EmployeePos = this.findOne(id);
    (await EmployeePos).destroy();

    return {id};
  }


}

module.exports =  EmployeePosService;
