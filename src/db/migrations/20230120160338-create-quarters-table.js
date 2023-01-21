'use strict';
const { QuarterSchema, QUARTERS_TABLE  } = require('../models/operations/quarters.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable(QUARTERS_TABLE, QuarterSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(QUARTERS_TABLE);
  }
};
