'use strict';

const {SALES_TABLE} = require('./../models/operations/sales.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {

    await queryInterface.addColumn(SALES_TABLE, 'sale_type',{
      allowNull:true,
      type: Sequelize.DataTypes.STRING,
      field: 'sale_type'
    });

  },

  down: async(queryInterface) => {
   await queryInterface.removeColumn(SALES_TABLE,'sale_type');
  }
};
