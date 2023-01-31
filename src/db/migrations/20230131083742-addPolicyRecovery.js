'use strict';

const {USER_TABLE} = require('./../models/catalogs/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {

    await queryInterface.addColumn(USER_TABLE, 'policy',{
      allowNull:true,
      type: Sequelize.DataTypes.BOOLEAN,
      field: 'policy',
      defaultValue:false,
    });


    await queryInterface.addColumn(USER_TABLE, 'password_reset',{
      allowNull:true,
      type: Sequelize.DataTypes.BOOLEAN,
      field: 'password_reset',
      defaultValue:true
    });



  },

  down: async(queryInterface) => {
   await queryInterface.removeColumn(USER_TABLE,'policy');
   await queryInterface.removeColumn(USER_TABLE,'password_reset');
  }
};
