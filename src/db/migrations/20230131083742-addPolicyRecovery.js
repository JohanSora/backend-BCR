'use strict';

const {UserSchema, USER_TABLE} = require('./../models/catalogs/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {

    await queryInterface.addColumn(USER_TABLE, 'policy', UserSchema.policy);


    await queryInterface.addColumn(USER_TABLE, 'password_reset', UserSchema.passwordReset);



  },

  down: async(queryInterface) => {
   await queryInterface.removeColumn(USER_TABLE,'policy');
   await queryInterface.removeColumn(USER_TABLE,'password_reset');
  }
};
