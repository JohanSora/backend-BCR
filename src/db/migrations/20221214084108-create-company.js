'use strict';
const { CompanySchema, COMPANY_TABLE  } = require('../models/catalogs/company.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable(COMPANY_TABLE, CompanySchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(COMPANY_TABLE);
  }
};
