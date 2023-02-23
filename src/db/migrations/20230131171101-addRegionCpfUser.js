'use strict';

const {USER_TABLE, UserSchema} = require('./../models/catalogs/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {

    await queryInterface.addColumn(USER_TABLE, 'region', UserSchema.region);


    await queryInterface.addColumn(USER_TABLE, 'cpf', UserSchema.cpf);



  },

  down: async(queryInterface) => {
   await queryInterface.removeColumn(USER_TABLE,'region');
   await queryInterface.removeColumn(USER_TABLE,'cpf');
  }
};
