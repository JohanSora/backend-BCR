const boom  = require('@hapi/boom');
const { v4: uuidv4} = require('uuid');

const { models } = require('./../../libs/sequelize');

class OrderCartService{

  constructor(){
    // construct
  }

  async createProcess(data){

    const orderNumber = uuidv4();
    let totalDigipointSubstract = 0;

      for(let item of data.productsObject){
          totalDigipointSubstract = 
      }



    const newOrderCart = await models.OrderCart.create(data);
    return newOrderCart;
  }

  async find(){
    const orderCarts = await models.OrderCart.findAll();
    return orderCarts;
  }

  async findOne(id){
    const orderCart = await models.OrderCart.findByPk(id);
    if(!orderCart){
     throw boom.notFound('Order Cart not found');
    }
    return orderCart;
  }

  async findRuleByQuarterFiscal(id){

    const data = await models.OrderCart.findOne({

      where:{fiscalPeriodId: id}

    });

    return data;

  }

  async update(id, changes){
     const orderCart = this.findOne(id);
     const resp = (await orderCart).update(changes);

     return resp;
  }

  async delete(id){
    const orderCart = this.findOne(id);
    (await orderCart).destroy();

    return {id};
  }


}

module.exports =  OrderCartService;
