const { Model, DataTypes, Sequelize } = require('sequelize');

const OPERATION_STATUS_TABLE = 'operation_statuses';

const OperationStatusSchema = {
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

  status: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },

  CreatedAt:{
    allowNull:false,
    type:DataTypes.DATE,
    field:'created_at',
    defaultValue: Sequelize.NOW
  }



}

class OperationStatus extends Model{

  static associate (models){

    this.hasMany(models.Person, {
      as: 'person',
      foreignKey: 'operationStatusId'
    });

    this.hasMany(models.Company, {
      as: 'company',
      foreignKey: 'operationStatusId'
    });

    this.hasMany(models.FiscalPeriod, {
      as: 'fiscalPeriod',
      foreignKey: 'operationStatusId'
    });
    this.hasMany(models.CsvFilesProcessed, {
      as: 'csvFilesProcessed',
      foreignKey: 'operationStatusId'
    });







  }

  static config(sequelize){
    return {
      sequelize,
      tableName:OPERATION_STATUS_TABLE,
      modelName:'OperationStatus',
      timestamps:false
    }
  }

}


module.exports = { OperationStatus, OperationStatusSchema, OPERATION_STATUS_TABLE };
