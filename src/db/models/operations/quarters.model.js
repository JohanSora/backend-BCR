const { Model, DataTypes, Sequelize } = require('sequelize');

const { FISCAL_PERIOD_TABLE } = require('../catalogs/fiscal-periods.model');

const QUARTERS_TABLE = 'quarters';


const QuarterSchema = {
  id:{
    allowNull:false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  name:{
    allowNull: false,
    type:DataTypes.STRING,
  },

  fiscalPeriodId: {
    field: 'fiscal_period_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: FISCAL_PERIOD_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },


  weeksPerQuarter:{
    allowNull: false,
    type:DataTypes.STRING,
    default:false,
    field:'weeks_per_quarter'
  },


  status:{
    allowNull: false,
    type:DataTypes.BOOLEAN,
  },


  CreatedAt:{
    allowNull:false,
    type:DataTypes.DATE,
    field:'created_at',
    defaultValue: Sequelize.NOW
  }


}

class Quarter extends Model{

  static associate (models){
    this.belongsTo(models.FiscalPeriod, { as: 'fiscalPeriod' });

    this.hasMany(models.Weeks, {
      as: 'week',
      foreignKey: 'quarterId'
    });

    this.hasMany(models.RedeemAwards, {
      as: 'redeemAwards',
      foreignKey: 'quarterId'
    });

    this.hasMany(models.Rules, {
      as: 'rules',
      foreignKey: 'quarterId'
    });

    this.hasMany(models.Rules, {
      as: 'quarter',
      foreignKey: 'quarterId'
    });






   /*  this.hasMany(models.Sales, {
      as: 'sales',
      foreignKey: 'fileUploadId'
    }); */




  }

  static config(sequelize){
    return {
      sequelize,
      tableName:QUARTERS_TABLE,
      modelName:'Quarter',
      timestamps:false
    }
  }

}


module.exports = { Quarter, QuarterSchema, QUARTERS_TABLE };
