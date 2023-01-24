'use strict';
const { FiscalPeriodSchema, FISCAL_PERIOD_TABLE  } = require('../models/catalogs/fiscal-periods.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable(FISCAL_PERIOD_TABLE, FiscalPeriodSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(FISCAL_PERIOD_TABLE);
  }
};
