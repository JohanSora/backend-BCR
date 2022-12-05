const { Model, DataTypes, Sequelize } = require('sequelize');

const { COUNTRY_TABLE } = require('./country.model');

const CITY_TABLE = 'cities';

const CitySchema = {
  id:{
    allowNull:false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  name:{
    allowNull: false,
    type:DataTypes.STRING
  },

  countryId: {
    field: 'country_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: COUNTRY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

  CreatedAt:{
    allowNull:false,
    type:DataTypes.DATE,
    field:'created_at',
    defaultValue: Sequelize.NOW
  }
}

class City extends Model{

  static associate(models) {
    this.belongsTo(models.Country, { as: 'country' });

    this.hasMany(models.State, {
      as: 'states',
      foreignKey: 'cityId'
    });

  }


  static config(sequelize){
    return {
      sequelize,
      tableName:CITY_TABLE,
      modelName:'City',
      timestamps:false
    }
  }

}


module.exports = { City, CitySchema, CITY_TABLE };
