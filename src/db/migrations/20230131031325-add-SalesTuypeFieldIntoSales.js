'use strict';

const {SalesSchema, SALES_TABLE} = require('./../models/operations/sales.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {

    await queryInterface.addColumn(SALES_TABLE, 'sale_type', SalesSchema.saleType);

  },

  down: async(queryInterface) => {
   await queryInterface.removeColumn(SALES_TABLE,'sale_type');
  }
};
