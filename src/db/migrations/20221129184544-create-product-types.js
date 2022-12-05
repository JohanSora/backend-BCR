'use strict';
const { ProductTypeSchema, PRODUCT_TYPE_TABLE  } = require('../models/catalogs/product-type.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable(PRODUCT_TYPE_TABLE, ProductTypeSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(PRODUCT_TYPE_TABLE);
  }
};
