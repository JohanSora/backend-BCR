const boom  = require('@hapi/boom');

const { models } = require('./../../libs/sequelize');

class PointsOfSaleService{

  constructor(){
    // construct
  }

  async create(data){
    const newPointsOfSale = await models.PointsOfSale.create(data);
    return newPointsOfSale;
  }

  async find(){

    const PointsOfSales = await models.PointsOfSale.findAll();

    return PointsOfSales;
  }

  async findOne(id){

    const PointsOfSale = await models.PointsOfSale.findByPk(id);
    if(!PointsOfSale){
     throw boom.notFound('Points Of Sale not found');
    }
    return PointsOfSale;
  }

  async update(id, changes){
     const PointsOfSale = this.findOne(id);
     const resp = (await PointsOfSale).update(changes);

     return resp;
  }

  async delete(id){
    const PointsOfSale = this.findOne(id);
    (await PointsOfSale).destroy();

    return {id};
  }


}

module.exports =  PointsOfSaleService;
