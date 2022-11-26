const { Model, DataTypes, Sequelize } = require('sequelize');

const LANGUAGE_TABLE = 'languages';

const LanguageSchema = {
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

  codeLang:{
    allowNull:false,
    type:DataTypes.STRING,
    field:'code_lang'
  },

  CreatedAt:{
    allowNull:false,
    type:DataTypes.DATE,
    field:'created_at',
    defaultValue: Sequelize.NOW
  }



}

class Language extends Model{

  static associate (){
     // Associate relationships
  }

  static config(sequelize){
    return {
      sequelize,
      tableName:LANGUAGE_TABLE,
      modelName:'Language',
      timestamps:false
    }
  }

}


module.exports = { Language, LanguageSchema, LANGUAGE_TABLE };
