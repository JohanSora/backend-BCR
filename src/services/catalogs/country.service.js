const boom  = require('@hapi/boom');

const { models } = require('./../../libs/sequelize');

class CountryService{

  constructor(){
    // construct
  }

  async create(data){
    const newCountry = await models.Country.create(data);
    return newCountry;
  }

  async find(){
    const countries = await models.Country.findAll();

    return countries;
  }

  async findOne(id){
    const country = await models.Country.findByPk(id);
    if(!country){
     throw boom.notFound('Country not found');
    }
    return country;
  }

  async update(id, changes){
     const country = this.findOne(id);
     const resp = (await country).update(changes);

     return resp;
  }

  async delete(id){
    const country = this.findOne(id);
    (await country).destroy();

    return {id};
  }


}

module.exports =  CountryService;
