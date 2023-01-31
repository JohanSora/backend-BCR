'use strict';

const {USER_TABLE} = require('./../models/catalogs/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {

    await queryInterface.addColumn(USER_TABLE, 'region',{
      allowNull:true,
      type: Sequelize.DataTypes.STRING,
      field: 'region',
      defaultValue:'N/A'
    });


    await queryInterface.addColumn(USER_TABLE, 'cpf',{
      allowNull:true,
      type: Sequelize.DataTypes.TEXT,
      field: 'cpf',
      defaultValue:'N/A'
    });



  },

  down: async(queryInterface) => {
   await queryInterface.removeColumn(USER_TABLE,'region');
   await queryInterface.removeColumn(USER_TABLE,'cpf');
  }
};
