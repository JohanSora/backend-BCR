const boom  = require('@hapi/boom');

const { models } = require('./../../libs/sequelize');

class StateService{

  constructor(){
    // construct
  }

  async create(data){
    const newState = await models.State.create(data);
    return newState;
  }

  async find(){

    const states = await models.State.findAll();

    return states;
  }

  async findOne(id){
    const options = {
      include:[
          {
            association:'city',
            include:['country']
          },
            'city'
      ]
    };

    const state = await models.State.findByPk(id, options);
    if(!state){
     throw boom.notFound('State not found');
    }
    return state;
  }

  async update(id, changes){
     const state = this.findOne(id);
     const resp = (await state).update(changes);

     return resp;
  }

  async delete(id){
    const state = this.findOne(id);
    (await state).destroy();

    return {id};
  }


}

module.exports =  StateService;
