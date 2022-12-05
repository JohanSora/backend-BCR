'use strict';
const { ErrorSalesProcessSchema, ERROR_SALES_PROCESS_TABLE  } = require('../models/catalogs/error-sales-process.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable(ERROR_SALES_PROCESS_TABLE, ErrorSalesProcessSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(ERROR_SALES_PROCESS_TABLE);
  }
};
