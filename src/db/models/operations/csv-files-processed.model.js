const { Model, DataTypes, Sequelize } = require('sequelize');

const OPERATION_STATUS_TABLE = require('./../catalogs/operation-status.model');
const CSV_FILES_PROCESSED_TABLE = 'csv_files_processed';


const CsvFilesProcessedSchema = {
  id:{
    allowNull:false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  nameUuid:{
    allowNull: false,
    type:DataTypes.STRING,
    field:'name_uuid'
  },

  extension:{
    allowNull: false,
    type:DataTypes.STRING
  },

  complete:{
    allowNull: false,
    type:DataTypes.BOOLEAN,
    default:false
  },


  pathSrc:{
    allowNull: false,
    type:DataTypes.STRING,
    field:'path_src'
  },

  operationStatusId: {
    field: 'status_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: OPERATION_STATUS_TABLE,
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

class CsvFilesProcessed extends Model{

  static associate (){
    // this.hasMany(models.Person, {
    //   as: 'person',
    //   foreignKey: 'academicDegreeId'
    // });
  }

  static config(sequelize){
    return {
      sequelize,
      tableName:CSV_FILES_PROCESSED_TABLE,
      modelName:'CsvFilesProcessed',
      timestamps:false
    }
  }

}


module.exports = { CsvFilesProcessed, CsvFilesProcessedSchema, CSV_FILES_PROCESSED_TABLE };
