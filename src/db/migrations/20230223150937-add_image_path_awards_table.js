'use strict';

const { AwardSchema , AWARD_TABLE } = require('./../models/catalogs/award.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {

    await queryInterface.addColumn(AWARD_TABLE, 'image_path_2', AwardSchema.imagePathSecond);

  },

  down: async(queryInterface) => {
   await queryInterface.removeColumn(AWARD_TABLE,'image_path_2');
  }
};

