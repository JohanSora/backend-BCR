const boom  = require('@hapi/boom');

const { models } = require('./../../libs/sequelize');

class RedeemAwardService{

  constructor(){
    // construct
  }

  async create(data){
    const newRedeemAward = await models.RedeemAwards.create(data);
    return newRedeemAward;
  }

  async find(){

    const RedeemAwards = await models.RedeemAwards.findAll();

    return RedeemAwards;
  }

  async findOne(id){

    const RedeemAwards = await models.RedeemAwards.findByPk(id);
    if(!RedeemAwards){
     throw boom.notFound('Redeem award not found');
    }
    return RedeemAwards;
  }

  async update(id, changes){
     const RedeemAwards = this.findOne(id);
     const resp = (await RedeemAwards).update(changes);

     return resp;
  }

  async delete(id){
    const RedeemAwards = this.findOne(id);
    (await RedeemAwards).destroy();

    return {id};
  }


}

module.exports =  RedeemAwardService;
