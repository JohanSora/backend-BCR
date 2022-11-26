const { Model, DataTypes, Sequelize } = require('sequelize');

const ACADEMIC_DEGREES_TABLE = 'academic_degrees';

const AcademicSchema = {
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

class AcademicDegrees extends Model{

  static associate (){
     // Associate relationships
  }

  static config(sequelize){
    return {
      sequelize,
      tableName:ACADEMIC_DEGREES_TABLE,
      modelName:'AcademicDegrees',
      timestamps:false
    }
  }

}


module.exports = { AcademicDegrees, AcademicSchema, ACADEMIC_DEGREES_TABLE };
