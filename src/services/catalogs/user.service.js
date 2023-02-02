const boom = require('@hapi/boom');
const bycrypt = require('bcrypt');
const { config } = require('./../../../config/config');
const saltArround = Number(config.envSalt);

const { models } = require('./../../libs/sequelize');

class UserService {
  constructor() {
    // construct
  }

  async create(data) {
    const encryptPassword = await bycrypt.hash(data.password, saltArround);

    const newUser = await models.User.create(
      {
        ...data,
        password: encryptPassword,
      },
      {
        include: ['person', 'employeePos'],
      }
    );

    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const users = await models.User.findAll({
      include: ['person', 'employeePos'],
      attributes: { exclude: ['password'] },
    });

    return users;
  }

  async findByEmail(email) {
    const data = await models.User.findOne({
      where: { email },
      include: ['person', 'employeePos']
    });

    return data;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id,{
      include:['person', 'employeePos']
    });
    if (!user) {
      throw boom.notFound('User not found');
    }
    delete user.dataValues.password;
    return user;
  }

  async update(id, changes) {
    let encryptPassword = '';
    let resp = '';

    if (changes.password != null) {
      encryptPassword = await bycrypt.hash(changes.password, saltArround);
    }

    const user = this.findOne(id);
    if (encryptPassword != '') {
      resp = (await user).update({ ...changes, password: encryptPassword });
    } else {
      resp = (await user).update(changes);
    }

    delete (await resp).dataValues.password;
    return resp;
  }

  async delete(id) {
    const user = this.findOne(id);
    (await user).destroy();

    return { id };
  }
}

module.exports = UserService;
