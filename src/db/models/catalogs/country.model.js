const { Model, DataTypes, Sequelize } = require('sequelize');

const COUNTRY_TABLE = 'countries';

const CountrySchema = {
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

  isoCode:{
    allowNull: false,
    type:DataTypes.STRING,
    field:'iso_code',
  },

  CreatedAt:{
    allowNull:false,
    type:DataTypes.DATE,
    field:'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Country extends Model{

  static associate(models) {

    //resolve relationship with products
    this.hasMany(models.City, {
      as: 'cities',
      foreignKey: 'countryId'
    });

    this.hasMany(models.PointsOfSale, {
      as: 'pointOfSale',
      foreignKey: 'countryId'
    });


  }

  static config(sequelize){
    return {
      sequelize,
      tableName:COUNTRY_TABLE,
      modelName:'Country',
      timestamps:false
    }
  }

}


module.exports = { Country, CountrySchema, COUNTRY_TABLE };
