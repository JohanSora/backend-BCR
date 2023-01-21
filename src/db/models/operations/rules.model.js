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


  CreatedAt:{
    allowNull:false,
    type:DataTypes.DATE,
    field:'created_at',
    defaultValue: Sequelize.NOW
  },

  baseAmount:{
    allowNull:true,
    type:DataTypes.DECIMAL,
    field: 'base_amount'
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
