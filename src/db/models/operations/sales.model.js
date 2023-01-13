const { Model, DataTypes, Sequelize } = require('sequelize');

const { OPERATION_STATUS_TABLE    }   = require('./../catalogs/operation-status.model');
const { CSV_FILES_PROCESSED_TABLE }   = require('./csv-files-processed.model');
const { ERROR_SALES_PROCESS_TABLE }   = require('./../catalogs/error-sales-process.model');
const { POINTS_OF_SALES_TABLE     }   = require('./../catalogs/points_of_sales.model');
const { COMPANY_EMPLOYEES_TABLE   }   = require('./company-employees.model');

const SALES_TABLE = 'sales';


const SalesSchema = {
  id:{
    allowNull:false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  posId: {
    field: 'pos_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: POINTS_OF_SALES_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

  productId: {
    field: 'pos_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: OPERATION_STATUS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

  employAssignedId: {
    field: 'employ_assigned_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: COMPANY_EMPLOYEES_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

  totalPoints:{
    allowNull: false,
    type:DataTypes.INTEGER,
    default:false
  },


  pendingPoints:{
    allowNull: false,
    type:DataTypes.INTEGER,
    default:false
  },

  assignedPoints:{
    allowNull: false,
    type:DataTypes.INTEGER,
    default:false
  },

  saleDates:{
    allowNull: false,
    type:DataTypes.DATE,
    default:false,
    defaultValue: Sequelize.NOW
  },

  pointsLoadDates:{
    allowNull: false,
    type:DataTypes.DATE,
    default:false,
    defaultValue: Sequelize.NOW
  },


  pointsAssignedDates:{
    allowNull: false,
    type:DataTypes.DATE,
    default:false,
    defaultValue: Sequelize.NOW
  },


  fileUploadId: {
    field: 'file_upload_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CSV_FILES_PROCESSED_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },


  uploadSuccess:{
    allowNull: false,
    type:DataTypes.BOOLEAN,
    default:false
  },


  invoiceNumber:{
    allowNull: false,
    type:DataTypes.STRING,
    default:false
  },

  saleAmount:{
    allowNull: false,
    type:DataTypes.DECIMAL,
    default:false
  },

  errorId: {
    field: 'error_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ERROR_SALES_PROCESS_TABLE,
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

class Sales extends Model{

  static associate (models){

    this.hasMany(models.EmployeePointsCollect, {
      as: 'employeePointsCollect',
      foreignKey: 'saleId'
    });

    this.belongsTo(models.PointsOfSale, { as: 'pointsOfSale' });
    this.belongsTo(models.Product, { as: 'product' });
    this.belongsTo(models.CsvFilesProcessed, { as: 'csvFilesProcessed' });
    this.belongsTo(models.ErrorSalesProcess, { as: 'errorSalesProcess' });

  }

  static config(sequelize){
    return {
      sequelize,
      tableName:SALES_TABLE,
      modelName:'Sales',
      timestamps:false
    }
  }

}


module.exports = { Sales, SalesSchema, SALES_TABLE };

