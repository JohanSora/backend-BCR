'use strict';
const { StateSchema, STATE_TABLE  } = require('../models/catalogs/state.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable(STATE_TABLE, StateSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(STATE_TABLE);
  }
};
