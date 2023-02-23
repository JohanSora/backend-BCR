'use strict';

const {RulesSchema, RULE_TABLE} = require('./../models/operations/rules.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {

    await queryInterface.addColumn(RULE_TABLE, 'sale_type', RulesSchema.saleType);

  },

  down: async(queryInterface) => {
   await queryInterface.removeColumn(RULE_TABLE,'sale_type');
  }
};

