'use strict';
const { LanguageSchema, LANGUAGE_TABLE  } = require('../models/language.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable(LANGUAGE_TABLE, LanguageSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(LANGUAGE_TABLE);
  }
};
