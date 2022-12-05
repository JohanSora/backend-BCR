const boom  = require('@hapi/boom');

const { models } = require('./../../libs/sequelize');

class PersonService{

  constructor(){
    // construct
  }

  async create(data){
    const newPerson = await models.Person.create(data);
    return newPerson;
  }

  async find(){

    const people = await models.Person.findAll();

    return people;
  }

  async findOne(id){
    const options = {
      include:[
        'operationStatus',
        'academicDegree',
        'language'
      ]
    };

    const person = await models.Person.findByPk(id, options);
    if(!person){
     throw boom.notFound('Person not found');
    }
    return person;
  }

  async update(id, changes){
     const person = this.findOne(id);
     const resp = (await person).update(changes);

     return resp;
  }

  async delete(id){
    const person = this.findOne(id);
    (await person).destroy();

    return {id};
  }


}

module.exports =  PersonService;
