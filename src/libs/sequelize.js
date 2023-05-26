const { Sequelize } = require('sequelize');
const { config } = require('../../config/config');

// require connectors
const { setupModels }  = require('./../db/models');
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPass);

const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: false,
});
setupModels(sequelize);

module.exports = sequelize
