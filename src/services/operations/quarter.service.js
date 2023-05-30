const boom  = require('@hapi/boom');

const { models } = require('./../../libs/sequelize');

class QuarterService{

  constructor(){
    // construct
  }

  async create(data){
    const newQuarter = await models.Quarter.create(data);
    return newQuarter;
  }

  async find(){
    const Quarters = await models.Quarter.findAll();
    return Quarters;
  }

  async findOne(id){
    const Quarter = await models.Quarter.findByPk(id);
    if(!Quarter){
     throw boom.notFound('Quarter not found');
    }
    return Quarter;
  }

  async findRuleByQuarterFiscal(id){

    const data = await models.Quarter.findOne({

      where:{
        fiscalPeriodId: id,
        status:true,
      }

    });

    return data;

  }

  async update(id, changes){
     const Quarter = this.findOne(id);
     const resp = (await Quarter).update(changes);

     return resp;
  }

  async delete(id){
    const Quarter = this.findOne(id);
    (await Quarter).destroy();

    return {id};
  }


}

module.exports =  QuarterService;
