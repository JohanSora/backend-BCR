const boom  = require('@hapi/boom');

const { models } = require('./../../libs/sequelize');

class RuleService{

  constructor(){
    // construct
  }

  async create(data){
    const newRule = await models.Rules.create(data);
    return newRule;
  }

  async find(){

    const Rules = await models.Rules.findAll();

    return Rules;
  }

  async findOne(id){

    const Rule = await models.Rules.findByPk(id);
    if(!Rule){
     throw boom.notFound('Rule not found');
    }
    return Rule;
  }

  async findByQuarter(quarter){

    const data = await models.Rules.findOne({
      where:{
        quarterId: quarter,
        status:true
      }
    });

    return data;


  }

  async update(id, changes){
     const Rule = this.findOne(id);
     const resp = (await Rule).update(changes);

     return resp;
  }

  async delete(id){
    const Rule = this.findOne(id);
    (await Rule).destroy();

    return {id};
  }


}

module.exports =  RuleService;
