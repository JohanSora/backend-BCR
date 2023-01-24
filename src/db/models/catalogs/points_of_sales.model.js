const { Model, DataTypes, Sequelize } = require('sequelize');

const { COUNTRY_TABLE } = require('./../catalogs/country.model');
const { COMPANY_TABLE } = require('./../catalogs/company.model');
const { USER_TABLE  }= require('./../catalogs/user.model');

const POINTS_OF_SALES_TABLE = 'points_of_sales';


const PointsOfSaleSchema = {
  id:{
    allowNull:false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  description:{
    allowNull: false,
    type:DataTypes.STRING,
    default:false
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

  companyId: {
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

// manager for this pos
  managerId: {
    field: 'manager_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

  serie:{
    allowNull: true,
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

  CreatedAt:{
    allowNull:false,
    type:DataTypes.DATE,
    field:'created_at',
    defaultValue: Sequelize.NOW
  }



}

class PointsOfSale extends Model{

  static associate (models){

    this.belongsTo(models.Country, { as: 'country' });
    this.belongsTo(models.Company, { as: 'company' });
    this.belongsTo(models.User, { as: 'manager' });

     this.hasMany(models.EmployeePos, {
      as: 'employeePos',
      foreignKey: 'posId'
    });

     this.hasMany(models.Sales, {
      as: 'sales',
      foreignKey: 'posId'
    });


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
