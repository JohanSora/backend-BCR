const boom  = require('@hapi/boom');
const bycrypt = require("bcrypt");
const {config} = require('./../../../config/config');
const saltArround = Number( config.envSalt );

const { models } = require('./../../libs/sequelize');

class UserService{

  constructor(){
    // construct
  }

  async create(data){

    const encryptPassword = await bycrypt.hash(
      data.password,
      saltArround

    );

    const newUser = await models.User.create({
      ...data,
          password:encryptPassword
    });

    delete newUser.dataValues.password;
    return newUser;
  }

  async find(){
    const users = await models.User.findAll({
      includes:['person']
    });

    return users;
  }

  async findByEmail(email){
    const data = await models.User.findOne({
      where:{email}
    });

    return data;
  }

  async findOne(id){
    const user = await models.User.findByPk(id);
    if(!user){
     throw boom.notFound('User not found');
    }
    delete user.dataValues.password;
    return user;
  }

  async update(id, changes){
     const user = this.findOne(id);
     const resp = (await user).update(changes);

     return resp;
  }

  async delete(id){
    const user = this.findOne(id);
    (await user).destroy();

    return {id};
  }


}

module.exports =  UserService;
