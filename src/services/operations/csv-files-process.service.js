const boom  = require('@hapi/boom');

const { models } = require('./../../libs/sequelize');

class CsvFileProcessService{

  constructor(){
    // construct
  }

  async create(data){
    const newCsvFile = await models.CsvFilesProcessed.create(data);
    return newCsvFile;
  }

  async find(){

    const csvFile = await models.CsvFilesProcessed.findAll();

    return csvFile;
  }

  async findOne(id){

    const csvFile = await models.CsvFileProcessService.findByPk(id, options);
    if(!csvFile){
     throw boom.notFound('Csv Files Processed not found');
    }
    return csvFile;
  }

  async update(id, changes){
     const CsvFilesProcessed = this.findOne(id);
     const resp = (await CsvFilesProcessed).update(changes);

     return resp;
  }

  async delete(id){
    const csvFile = this.findOne(id);
    (await csvFile).destroy();

    return {id};
  }


}

module.exports =  CsvFileProcessService;
