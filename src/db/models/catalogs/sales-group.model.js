const { Model, DataTypes, Sequelize } = require('sequelize');

const SALES_GROUP_TABLE = 'sales_groups';

const SalesGroupSchema = {
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

  CreatedAt:{
    allowNull:false,
    type:DataTypes.DATE,
    field:'created_at',
    defaultValue: Sequelize.NOW
  }



}

class SalesGroup extends Model{

  static associate (){
     // Associate relationships
  }

  static config(sequelize){
    return {
      sequelize,
      tableName:SALES_GROUP_TABLE,
      modelName:'SalesGroup',
      timestamps:false
    }
  }

}


module.exports = { SalesGroup, SalesGroupSchema, SALES_GROUP_TABLE };
