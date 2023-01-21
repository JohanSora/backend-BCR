'use strict';
const { RedeemAwardsSchema, REDEEM_AWARDS_TABLE  } = require('../models/operations/redeem-awards.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable(REDEEM_AWARDS_TABLE, RedeemAwardsSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(REDEEM_AWARDS_TABLE);
  }
};
