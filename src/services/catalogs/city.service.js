const boom  = require('@hapi/boom');

const { models } = require('./../../libs/sequelize');

class CityService{

  constructor(){
    // construct
  }

  async create(data){
    const newCity = await models.City.create(data);
    return newCity;
  }

  async find(){

    const cities = await models.City.findAll();

    return cities;
  }

  async findOne(id){
    const options = {
      include:['country']
    };

    const city = await models.City.findByPk(id, options);
    if(!city){
     throw boom.notFound('City not found');
    }
    return city;
  }

  async update(id, changes){
     const city = this.findOne(id);
     const resp = (await city).update(changes);

     return resp;
  }

  async delete(id){
    const city = this.findOne(id);
    (await city).destroy();

    return {id};
  }


}

module.exports =  CityService;
