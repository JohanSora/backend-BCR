'use strict';
const { AcademicSchema, ACADEMIC_DEGREES_TABLE  } = require('../models/academic-degrees.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable(ACADEMIC_DEGREES_TABLE, AcademicSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(ACADEMIC_DEGREES_TABLE);
  }
};
