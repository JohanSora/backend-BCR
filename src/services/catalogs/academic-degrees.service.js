const boom  = require('@hapi/boom');

const { models } = require('./../../libs/sequelize');

class AcademicDegreeService{

  constructor(){
    // construct
  }

  async create(data){
    const newAcademicDegrees = await models.AcademicDegrees.create(data);
    return newAcademicDegrees;
  }

  async find(){
    const academicDegree = await models.AcademicDegrees.findAll();

    return academicDegree;
  }

  async findOne(id){
    const academicDegree = await models.AcademicDegrees.findByPk(id);
    if(!academicDegree){
     throw boom.notFound('Academic Degree not found');
    }
    return academicDegree;
  }

  async update(id, changes){
     const academicDegree = this.findOne(id);
     const resp = (await academicDegree).update(changes);

     return resp;
  }

  async delete(id){
    const academicDegree = this.findOne(id);
    (await academicDegree).destroy();

    return {id};
  }


}

module.exports =  AcademicDegreeService;
