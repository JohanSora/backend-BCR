'use strict';
const { RulesSchema, RULE_TABLE  } = require('../models/operations/rules.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable(RULE_TABLE, RulesSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(RULE_TABLE);
  }
};

