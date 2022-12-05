'use strict';
const { OperationStatusSchema, OPERATION_STATUS_TABLE  } = require('../models/catalogs/operation-status.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable(OPERATION_STATUS_TABLE, OperationStatusSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(OPERATION_STATUS_TABLE);
  }
};
