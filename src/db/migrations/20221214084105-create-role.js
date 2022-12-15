'use strict';
const { RoleSchema, ROLE_TABLE  } = require('../models/catalogs/role.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable(ROLE_TABLE, RoleSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(ROLE_TABLE);
  }
};

