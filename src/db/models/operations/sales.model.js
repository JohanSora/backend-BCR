const { Model, DataTypes, Sequelize } = require('sequelize');

const { PRODUCT_TABLE    }   = require('./../catalogs/product.model');
const { CSV_FILES_PROCESSED_TABLE }   = require('./csv-files-processed.model');
const { ERROR_SALES_PROCESS_TABLE }   = require('./../catalogs/error-sales-process.model');
const { POINTS_OF_SALES_TABLE     }   = require('./../catalogs/points_of_sales.model');
const { USER_TABLE   }   = require('./../catalogs/user.model');

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
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: POINTS_OF_SALES_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

  productId: {
    field: 'product_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

  employAssignedId: {
    field: 'employ_assigned_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

  totalPoints:{
    field: 'total_points',
    allowNull: false,
    type:DataTypes.INTEGER,
    default:false
  },


  pendingPoints:{
    field: 'pending_points',
    allowNull: false,
    type:DataTypes.INTEGER,
    default:false
  },

  assignedPoints:{
    field: 'assigned_points',
    allowNull: false,
    type:DataTypes.INTEGER,
    default:false
  },

  saleDates:{
    field: 'sale_date',
    allowNull: false,
    type:DataTypes.DATE,
    default:false,
    defaultValue: Sequelize.NOW
  },

  pointsLoadDates:{
    field: 'points_load_date',
    allowNull: false,
    type:DataTypes.DATE,
    default:false,
    defaultValue: Sequelize.NOW
  },


  pointsAssignedDates:{
    field: 'points_assigned_date',
    allowNull: true,
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
    field: 'upload_success',
    allowNull: false,
    type:DataTypes.BOOLEAN,
    default:false
  },


  invoiceNumber:{
    field: 'invoice_number',
    allowNull: false,
    type:DataTypes.STRING,
    default:false
  },

  saleAmount:{
    field: 'sales_amount',
    allowNull: false,
    type:DataTypes.DECIMAL,
    default:false
  },

  errorId: {
    field: 'error_id',
    allowNull: true,
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

    this.belongsTo(models.PointsOfSale, { as: 'pos' });
    this.belongsTo(models.Product, { as: 'product' });
    this.belongsTo(models.CsvFilesProcessed, { as: 'fileUpload' });
    this.belongsTo(models.ErrorSalesProcess, { as: 'error' });
    this.belongsTo(models.User, { as: 'employAssigned' });

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

