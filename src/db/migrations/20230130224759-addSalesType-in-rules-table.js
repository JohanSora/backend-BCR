'use strict';

const {RULE_TABLE} = require('./../models/operations/rules.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {

    await queryInterface.addColumn(RULE_TABLE, 'sale_type',{
      allowNull:true,
      type: Sequelize.DataTypes.STRING,
      field: 'sale_type'
    });

  },

  down: async(queryInterface) => {
   await queryInterface.removeColumn(RULE_TABLE,'sale_type');
  }
};

