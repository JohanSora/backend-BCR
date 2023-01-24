const { Model, DataTypes, Sequelize } = require('sequelize');

const { COMPANY_TABLE } = require('./company.model');
const { OPERATION_STATUS_TABLE } = require('./operation-status.model');


const FISCAL_PERIOD_TABLE = 'fiscal_periods';

const FiscalPeriodSchema = {
  id:{
    allowNull:false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  dateStart:{
    allowNull: true,
    type:DataTypes.DATEONLY,
    field: "date_start",
    comment:"date begin quarter"
  },

  quarterStart: {
    allowNull: false,
    field: 'quarter_start',
    type: DataTypes.INTEGER,
    comment: "Number quarter begin"
  },

  dateEnd:{
    allowNull: true,
    type:DataTypes.DATEONLY,
    field: "date_end",
    comment:"date end quarter"
  },

  fiscalYear:{
    allowNull: true,
    type:DataTypes.INTEGER,
    field: "fiscal_year",
    comment:"year for fiscal period"
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

  companyId: {
    field: 'company_id',
    allowNull: true,
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

class FiscalPeriod extends Model{

  static associate(models) {

    this.belongsTo(models.OperationStatus, { as: 'operationStatus' });
    this.belongsTo(models.Company, { as: 'company' });

    this.hasMany(models.Quarter, {
      as: 'quarter',
      foreignKey: 'fiscalPeriodId'
    });


  }

  static config(sequelize){
    return {
      sequelize,
      tableName:FISCAL_PERIOD_TABLE,
      modelName:'FiscalPeriod',
      timestamps:false
    }
  }

}


module.exports = { FiscalPeriod, FiscalPeriodSchema, FISCAL_PERIOD_TABLE };
