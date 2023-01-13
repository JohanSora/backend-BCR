'use strict';
const { PointsOfSaleSchema, POINTS_OF_SALES_TABLE  } = require('../models/catalogs/points_of_sales.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable(POINTS_OF_SALES_TABLE, PointsOfSaleSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(POINTS_OF_SALES_TABLE);
  }
};
