const { Model, DataTypes, Sequelize } = require('sequelize');

const AWARD_TABLE = 'awards';

const AwardSchema = {
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

  digipoints:{
    allowNull: false,
    type:DataTypes.INTEGER
  },

  price:{
    allowNull: false,
    type:DataTypes.DECIMAL
  },

  imagePath: {
    allowNull: false,
    type: DataTypes.STRING,
    field:'image_path'
  },

  status: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },

  description: {
    allowNull: false,
    type: DataTypes.TEXT
  },

  apiKey: {
    allowNull: true,
    type: DataTypes.STRING,
    field:'api_key'
  },

  apiUri: {
    allowNull: true,
    type: DataTypes.STRING,
    field:'api_uri'
  },

  CreatedAt:{
    allowNull:false,
    type:DataTypes.DATE,
    field:'created_at',
    defaultValue: Sequelize.NOW
  },

  imagePathSecond:{
    allowNull:true,
    type: DataTypes.STRING,
    field:'image_path_2'
  },






}

class Award extends Model{

  static associate (models){

    this.hasMany(models.RedeemAwards, {
      as: 'redeemAward',
      foreignKey: 'awardId'
    });


     // Associate relationships
  }

  static config(sequelize){
    return {
      sequelize,
      tableName:AWARD_TABLE,
      modelName:'Award',
      timestamps:false
    }
  }

}


module.exports = { Award, AwardSchema, AWARD_TABLE };
