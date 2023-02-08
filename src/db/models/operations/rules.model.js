const { Model, DataTypes, Sequelize } = require('sequelize');

const { QUARTERS_TABLE } = require('./../operations/quarters.model');

const RULE_TABLE = 'rules';


const RulesSchema = {
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

  digipointsPerAmount:{
    allowNull: false,
    type:DataTypes.INTEGER,
    field: 'digipoints_per_amount'
  },

  quarterId: {
    field: 'quarter_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: QUARTERS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

  weeks:{
    allowNull: false,
    type:DataTypes.TEXT('long'),
  },

  status:{
    allowNull:false,
    default: true,
    type:DataTypes.BOOLEAN
  },

  baseAmount:{
    allowNull:true,
    type:DataTypes.DECIMAL,
    field: 'base_amount'
  },


  CreatedAt:{
    allowNull:false,
    type:DataTypes.DATE,
    field:'created_at',
    defaultValue: Sequelize.NOW
  },

  saleType:{
    allowNull: true,
    type:DataTypes.STRING,
    field:'sale_type'
  },


  multiplier:{
    allowNull: true,
    type:DataTypes.INTEGER,
    field:'multiplier'
  },


  reason:{
    allowNull: true,
    type:DataTypes.TEXT
  },

  promotion:{
    allowNull:false,
    default: false,
    type:DataTypes.BOOLEAN
  },

}

class Rules extends Model{

  static associate (models){
    this.belongsTo(models.Quarter, { as: 'quarter' });

  }

  static config(sequelize){
    return {
      sequelize,
      tableName:RULE_TABLE,
      modelName:'Rules',
      timestamps:false
    }
  }

}


module.exports = { Rules, RulesSchema, RULE_TABLE };
