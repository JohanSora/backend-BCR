const boom  = require('@hapi/boom');

const { models } = require('./../../libs/sequelize');

class FiscalPeriod{

  constructor(){
    // construct
  }

  async create(data){
    const newFiscalPeriod = await models.FiscalPeriod.create(data);
    return newFiscalPeriod;
  }

  async find(){

    const fiscalPeriods = await models.FiscalPeriod.findAll();
    return fiscalPeriods;

  }

  async findOne(id){

    const options = {
        include:[
            'operationStatus',
            'company'
        ]
    };

    const fiscalPeriod = await models.FiscalPeriod.findByPk(id, options);
    if(!fiscalPeriod){
     throw boom.notFound('Fiscal period not found');
    }
    return fiscalPeriod;
  }


  async findByCompany(id){


    const data = await models.FiscalPeriod.findOne({
      where:{
        companyId: id,
        operationStatusId:4
      }
    });

    return data;



  }


  async update(id, changes){
     const fiscalPeriod = this.findOne(id);
     const resp = (await fiscalPeriod).update(changes);

     return resp;
  }

  async delete(id){

    const fiscalPeriod = this.findOne(id);
    (await fiscalPeriod).destroy();

    return {id};
  }


}

module.exports =  FiscalPeriod;
