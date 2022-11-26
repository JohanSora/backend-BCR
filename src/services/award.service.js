const boom  = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class AwardService{

  constructor(){
    // construct
  }

  async create(data){
    const newAward = await models.Award.create(data);
    return newAward;
  }

  async find(){
    const awards = await models.Award.findAll();

    return awards;
  }

  async findOne(id){
    const award = await models.Award.findByPk(id);

    if(!award){
     throw boom.notFound('Award not found');
    }

    return award;
  }

  async update(id, changes){
     const Award = this.findOne(id);
     const resp = (await Award).update(changes);

     return resp;
  }

  async delete(id){
    const Award = this.findOne(id);
    (await Award).destroy();

    return {id};
  }


}

module.exports =  AwardService;
