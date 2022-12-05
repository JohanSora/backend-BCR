'use strict';
const { SalesGroupSchema, SALES_GROUP_TABLE  } = require('../models/catalogs/sales-group.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable(SALES_GROUP_TABLE, SalesGroupSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(SALES_GROUP_TABLE);
  }
};
