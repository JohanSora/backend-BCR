const boom  = require('@hapi/boom');
const bycrypt = require("bcrypt");
const {config} = require('./../../../config/config');
const saltArround = Number( config.envSalt );

const { models } = require('./../../libs/sequelize');

class PersonService{

  constructor(){
    // construct
  }

  async create(data){

    const encryptPassword = await bycrypt.hash(
      data.user.password,
      saltArround
    );

    const newData = {
      ...data,
      user:{
        ...data.user,
        password: encryptPassword
      }
  }


    const newPerson = await models.Person.create(newData, {
      include:['user']
    });
    return newPerson;
  }

  async find(){

    const people = await models.Person.findAll({
      include:['user']
    });

    return people;
  }

  async findOne(id){
    const options = {
      include:[
        'operationStatus',
        'academicDegree',
        'language',
        'user',
      ]
    };

    const person = await models.Person.findByPk(id, options);
    if(!person){
     throw boom.notFound('Person not found');
    }
    delete person.dataValues.user.dataValues.password
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
