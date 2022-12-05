const boom  = require('@hapi/boom');

const { models } = require('./../../libs/sequelize');

class ProductTypeService{

  constructor(){
    // construct
  }

  async create(data){
    const newProductType = await models.ProductType.create(data);
    return newProductType;
  }

  async find(){
    const productType = await models.ProductType.findAll();

    return productType;
  }

  async findOne(id){
    const productType = await models.ProductType.findByPk(id);
    if(!productType){
     throw boom.notFound('Product type not found');
    }
    return productType;
  }

  async update(id, changes){
     const ProductType = this.findOne(id);
     const resp = (await ProductType).update(changes);

     return resp;
  }

  async delete(id){
    const ProductType = this.findOne(id);
    (await ProductType).destroy();

    return {id};
  }


}

module.exports =  ProductTypeService;
