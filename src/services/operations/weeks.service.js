const boom  = require('@hapi/boom');

const { models } = require('./../../libs/sequelize');

class WeekService{

  constructor(){
    // construct
  }

  async create(data){
    const newWeeks = await models.Weeks.create(data);
    return newWeeks;
  }

  async find(){

    const Weeks = await models.Weeks.findAll();

    return Weeks;
  }

  async findOne(id){

    const Week = await models.Weeks.findByPk(id);
    if(!Week){
     throw boom.notFound('Week not found');
    }
    return Week;
  }

  async update(id, changes){
     const Week = this.findOne(id);
     const resp = (await Week).update(changes);

     return resp;
  }

  async delete(id){
    const Week = this.findOne(id);
    (await Week).destroy();

    return {id};
  }


}

module.exports =  WeekService;
