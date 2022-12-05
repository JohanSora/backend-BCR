const boom  = require('@hapi/boom');

const { models } = require('./../../libs/sequelize');

class LanguageService{

  constructor(){
    // construct
  }

  async create(data){
    const newLanguage = await models.Language.create(data);
    return newLanguage;
  }

  async find(){
    const languages = await models.Language.findAll();

    return languages;
  }

  async findOne(id){
    const language = await models.Language.findByPk(id);
    if(!language){
     throw boom.notFound('Language not found');
    }
    return language;
  }

  async update(id, changes){
     const Language = this.findOne(id);
     const resp = (await Language).update(changes);

     return resp;
  }

  async delete(id){
    const Language = this.findOne(id);
    (await Language).destroy();

    return {id};
  }


}

module.exports =  LanguageService;
