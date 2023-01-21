const boom  = require('@hapi/boom');

const { models } = require('./../../libs/sequelize');

class ProductService{

  constructor(){
    // construct
  }

  async create(data){
    const newProducts = await models.Product.create(data);
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

      const data = await models.Product.findOne({
        where:{
          description:name
        }
      });

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
