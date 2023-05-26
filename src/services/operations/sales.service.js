const boom  = require('@hapi/boom');

const { models } = require('./../../libs/sequelize');

class SaleService{

  constructor(){
    // construct
  }

  async create(data){
    const newSale = await models.Sales.create(data);
    return newSale;
  }

  async find(){
    const sales = await models.Sales.findAll();

    return sales;
  }

  async findOne(id){
    const sale = await models.Sales.findByPk(id);
    if(!sale){
     throw boom.notFound('Sale not found');
    }
    return sale;
  }

  async update(id, changes){
     const sale = this.findOne(id);
     const resp = (await sale).update(changes);

     return resp;
  }

  async delete(id){
    const sale = this.findOne(id);
    (await sale).destroy();

    return {id};
  }

  async findSaleByUser(userId){

    const { Op } = require("sequelize");

    const sales = await models.Sales.findAll( {
      where:{
        employAssignedId: userId,
        errorId:{
          [Op.is]: null,
        },
        assignedPoints:{
          [Op.eq]: 0,
        }
      }
    });

    return sales;

  }

  async findSaleByInvoice(invoice_number){
    const sales = await models.Sales.findAll({
      where: {
        invoice_number,
      },
      include: [
        {
          model: models.Product,
          as: 'product',
          attributes: ['description'],
        }
      ]
    });

    return sales;
    
  }

}

module.exports =  SaleService;
