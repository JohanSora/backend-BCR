const { Model, DataTypes, Sequelize } = require('sequelize');

const { QUARTERS_TABLE } = require('./../operations/quaters.model');

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
    type:DataTypes.BOOLEAN,
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
  }



}

class Rules extends Model{

  static associate (models){
    this.belongsTo(models.OperationStatus, { as: 'Rules' });

   /*  this.hasMany(models.Sales, {
      as: 'sales',
      foreignKey: 'fileUploadId'
    }); */


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
