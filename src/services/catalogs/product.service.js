const boom  = require('@hapi/boom');
const { v4: uuidv4} = require('uuid');

const { models } = require('./../../libs/sequelize');

class ProductService{

  constructor(){
    // construct
  }

  async create(data){
    const sku = uuidv4();
    const newProducts = await models.Product.create({
      ...data,
      skuUuid:sku
    });
    return newProducts;
  }

  async find(){
    const product = await models.Product.findAll();

    return product;
  }

  async findOne(id){
    const product = await models.Product.findByPk(id);
    if(!product){
     throw boom.notFound('Product not found');
    }
    return product;
  }

  async findByName(name){
      console.log('product name recieve: ', name);
      const data = await models.Product.findOne({
        where:{
          description:name
        }
      });

      if(!data){
        throw boom.notFound('Product not found');
      }

      return data;

  }

  async update(id, changes){
     const product = this.findOne(id);
     const resp = (await product).update(changes);

     return resp;
  }

  async delete(id){
    const product = this.findOne(id);
    (await product).destroy();

    return {id};
  }


}

module.exports =  ProductService;
