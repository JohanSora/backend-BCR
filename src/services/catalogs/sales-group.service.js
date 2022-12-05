const boom  = require('@hapi/boom');

const { models } = require('./../../libs/sequelize');

class SalesGroupService{

  constructor(){
    // construct
  }

  async create(data){
    const newSalesGroup = await models.SalesGroup.create(data);
    return newSalesGroup;
  }

  async find(){
    const salesGroup = await models.SalesGroup.findAll();

    return salesGroup;
  }

  async findOne(id){
    const salesGroup = await models.SalesGroup.findByPk(id);
    if(!salesGroup){
     throw boom.notFound('Sales type not found');
    }
    return salesGroup;
  }

  async update(id, changes){
     const salesGroup = this.findOne(id);
     const resp = (await salesGroup).update(changes);

     return resp;
  }

  async delete(id){
    const salesGroup = this.findOne(id);
    (await salesGroup).destroy();

    return {id};
  }


}

module.exports =  SalesGroupService;
