'use strict';
const { CsvFilesProcessedSchema, CSV_FILES_PROCESSED_TABLE  } = require('../models/operations/csv-files-processed.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable(CSV_FILES_PROCESSED_TABLE, CsvFilesProcessedSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CSV_FILES_PROCESSED_TABLE);
  }
};
