const { Model, DataTypes, Sequelize } = require('sequelize');

const { OPERATION_STATUS_TABLE } = require('./operation-status.model');
const { PERSON_TABLE } = require('./person.model');

const COMPANY_TABLE = 'companies';

const CompanySchema = {
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

  representativeId: {
    field: 'representative_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PERSON_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

  phoneNumber:{
    allowNull: true,
    type:DataTypes.STRING,
    field:'phone_number'

  },

  operationStatusId: {
    field: 'status_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: OPERATION_STATUS_TABLE,
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

class Company extends Model{

  static associate(models) {

    this.belongsTo(models.OperationStatus, { as: 'operationStatus' });
    this.belongsTo(models.Person, { as: 'representative' });

    this.hasMany(models.FiscalPeriod, {
      as: 'FiscalPeriod',
      foreignKey: 'companyId'
    });

    this.hasMany(models.PointsOfSale, {
      as: 'pointsOfSale',
      foreignKey: 'companyId'
    });




  }

  static config(sequelize){
    return {
      sequelize,
      tableName:COMPANY_TABLE,
      modelName:'Company',
      timestamps:false
    }
  }

}


module.exports = { Company, CompanySchema, COMPANY_TABLE };
