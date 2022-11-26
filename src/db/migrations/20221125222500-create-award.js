'use strict';
const { AwardSchema, AWARD_TABLE  } = require('../models/award.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable(AWARD_TABLE, AwardSchema);

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable(AWARD_TABLE);

  }
};
