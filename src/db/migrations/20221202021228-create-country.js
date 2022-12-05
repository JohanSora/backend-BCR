'use strict';
const { CountrySchema, COUNTRY_TABLE  } = require('../models/catalogs/country.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable(COUNTRY_TABLE, CountrySchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(COUNTRY_TABLE);
  }
};
