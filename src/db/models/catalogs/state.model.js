const { Model, DataTypes, Sequelize } = require('sequelize');

 const { CITY_TABLE } = require('./city.model');

const STATE_TABLE = 'states';

const StateSchema = {
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

  cityId: {
    field: 'city_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CITY_TABLE,
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

class State extends Model{

  static associate(models) {
    this.belongsTo(models.City, { as: 'city' });
  }

  static config(sequelize){
    return {
      sequelize,
      tableName:STATE_TABLE,
      modelName:'State',
      timestamps:false
    }
  }

}


module.exports = { State, StateSchema, STATE_TABLE };
