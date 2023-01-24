'use strict';
const { EmployeePosSchema, EMPLOYEE_POS_TABLE  } = require('../models/operations/employees-pos.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable(EMPLOYEE_POS_TABLE, EmployeePosSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(EMPLOYEE_POS_TABLE);
  }
};
