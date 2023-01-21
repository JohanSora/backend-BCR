'use strict';
const { WeekSchema, WEEKS_TABLE  } = require('../models/operations/weeks.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable(WEEKS_TABLE, WeekSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(WEEKS_TABLE);
  }
};
