const { Model, DataTypes, Sequelize } = require('sequelize');

const { QUARTERS_TABLE } = require('./../operations/quarters.model');

const WEEKS_TABLE = 'weeks';


const WeekSchema = {
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

  quarterId: {
    field: 'quarter_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: QUARTERS_TABLE,
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

class Weeks extends Model{

  static associate (models){
    this.belongsTo(models.Quarter, { as: 'quarter' });

   /*  this.hasMany(models.Sales, {
      as: 'sales',
      foreignKey: 'fileUploadId'
    }); */


  }

  static config(sequelize){
    return {
      sequelize,
      tableName:WEEKS_TABLE,
      modelName:'Weeks',
      timestamps:false
    }
  }

}


module.exports = { Weeks, WeekSchema, WEEKS_TABLE };
