const { Model, DataTypes, Sequelize } = require('sequelize');

const ERROR_SALES_PROCESS_TABLE = 'error_sales_process';

const ErrorSalesProcessSchema = {
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


  errorCode:{
    allowNull: false,
    type:DataTypes.STRING,
    field:'error_code'

  },


  description:{
    allowNull: false,
    type:DataTypes.TEXT
  },


  CreatedAt:{
    allowNull:false,
    type:DataTypes.DATE,
    field:'created_at',
    defaultValue: Sequelize.NOW
  }



}

class ErrorSalesProcess extends Model{

  static associate (){
    // this.hasMany(models.Person, {
    //   as: 'person',
    //   foreignKey: 'academicDegreeId'
    // });
  }

  static config(sequelize){
    return {
      sequelize,
      tableName:ERROR_SALES_PROCESS_TABLE,
      modelName:'ErrorSalesProcess',
      timestamps:false
    }
  }

}


module.exports = { ErrorSalesProcess, ErrorSalesProcessSchema, ERROR_SALES_PROCESS_TABLE };
