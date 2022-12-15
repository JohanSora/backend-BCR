const boom  = require('@hapi/boom');

const { models } = require('./../../libs/sequelize');

class RoleService{

  constructor(){
    // construct
  }

  async create(data){
    const newRole = await models.Role.create(data);
    return newRole;
  }

  async find(){

    const roles = await models.Role.findAll();

    return roles;
  }

  async findOne(id){
    const options = {
      include:['user']
    };

    const role = await models.Role.findByPk(id, options);
    if(!role){
     throw boom.notFound('Role not found');
    }
    return role;
  }

  async update(id, changes){
     const role = this.findOne(id);
     const resp = (await role).update(changes);

     return resp;
  }

  async delete(id){
    const role = this.findOne(id);
    (await role).destroy();

    return {id};
  }


}

module.exports =  RoleService;
