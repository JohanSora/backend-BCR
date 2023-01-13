'use strict';
const { CompanyEmployeeSchema, COMPANY_EMPLOYEES_TABLE  } = require('../models/operations/company-employees.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable(COMPANY_EMPLOYEES_TABLE, CompanyEmployeeSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(COMPANY_EMPLOYEES_TABLE);
  }
};
