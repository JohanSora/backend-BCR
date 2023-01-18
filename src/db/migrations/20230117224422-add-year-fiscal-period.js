'use strict';

const {FISCAL_PERIOD_TABLE} = require('./../models/catalogs/fiscal-periods.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {

    await queryInterface.addColumn(FISCAL_PERIOD_TABLE, 'fiscal_year',{
      allowNull:true,
      type: Sequelize.DataTypes.STRING,
      field: 'fiscal_year'
    });

  },

  down: async(queryInterface) => {
   await queryInterface.removeColumn(FISCAL_PERIOD_TABLE,'fiscal_year');
  }
};

