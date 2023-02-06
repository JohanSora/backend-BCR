'use strict';

const {QUARTERS_TABLE} = require('./../models/operations/quarters.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {

    await queryInterface.addColumn(QUARTERS_TABLE, 'goals',{
      allowNull:true,
      type: Sequelize.DataTypes.STRING,
      field: 'goals'
    });



  },

  down: async(queryInterface) => {
   await queryInterface.removeColumn(QUARTERS_TABLE,'goals');
  }
};
