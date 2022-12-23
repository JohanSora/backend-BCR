const { Model, DataTypes, Sequelize } = require('sequelize');

const COUNTRY_TABLE = require('./../catalogs/country.model');
const COMPANY_TABLE = require('./../catalogs/company.model');
const PERSON_TABLE = require('./../catalogs/person.model');
const POINTS_OF_SALES_TABLE = 'points_of_sales';


const PointsOfSaleSchema = {
  id:{
    allowNull:false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
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

  personId: {
    field: 'person_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PERSON_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

  serie:{
    allowNull: false,
    type:DataTypes.INTEGER
  },


  status:{
    allowNull: false,
    type:DataTypes.BOOLEAN,
    default:false
  },


  digipointsCollect:{
    allowNull: false,
    type:DataTypes.INTEGER,
    field:'digipoints_collect',
    default: 0
  },


  CompanyId: {
    field: 'company_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: COMPANY_TABLE,
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

class PointsOfSale extends Model{

  static associate (){
    // this.hasMany(models.Person, {
    //   as: 'person',
    //   foreignKey: 'academicDegreeId'
    // });
  }

  static config(sequelize){
    return {
      sequelize,
      tableName:POINTS_OF_SALES_TABLE,
      modelName:'PointsOfSale',
      timestamps:false
    }
  }

}

module.exports = { PointsOfSale, PointsOfSaleSchema, POINTS_OF_SALES_TABLE }
