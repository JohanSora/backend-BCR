'use strict';
const { CitySchema, CITY_TABLE  } = require('../models/catalogs/city.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable(CITY_TABLE, CitySchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CITY_TABLE);
  }
};
