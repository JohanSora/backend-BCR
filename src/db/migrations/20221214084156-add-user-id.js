'use strict';

const {PERSON_TABLE} = require('./../models/catalogs/person.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {

    await queryInterface.addColumn(PERSON_TABLE, 'user_id',{
      allowNull:true,
      type: Sequelize.DataTypes.STRING,
      field: 'user_id'
    });

  },

  down: async(queryInterface) => {
   await queryInterface.removeColumn(PERSON_TABLE,'user_id');
  }
};
