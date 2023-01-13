'use strict';
const { EmployeePointsCollectSchema, EMPLOYEE_POINTS_COLLECT_TABLE  } = require('../models/operations/employee-points-collect.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable(EMPLOYEE_POINTS_COLLECT_TABLE, EmployeePointsCollectSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(EMPLOYEE_POINTS_COLLECT_TABLE);
  }
};
