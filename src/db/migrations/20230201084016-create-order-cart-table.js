'use strict';
const { OrderCartSchema, ORDER_CARTS_TABLE  } = require('../models/operations/order-cart.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable(ORDER_CARTS_TABLE, OrderCartSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(ORDER_CARTS_TABLE);
  }
};

