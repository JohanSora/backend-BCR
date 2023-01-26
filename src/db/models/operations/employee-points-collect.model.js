const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./../catalogs/user.model');
const { SALES_TABLE } = require('./sales.model');
const { OPERATION_STATUS_TABLE } = require('./../catalogs/operation-status.model');


const EMPLOYEE_POINTS_COLLECT_TABLE = 'employee_points_collects';

const EmployeePointsCollectSchema = {

  id:{
    allowNull:false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },


  employeeId: {
    field: 'employ_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

  statusId: {
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

  pointsAssigned:{
    field: 'points_assigned',
    allowNull: false,
    type:DataTypes.INTEGER,
    default:false
  },

  pointsRedeemed:{
    field: 'points_redeemed',
    allowNull: false,
    type:DataTypes.INTEGER,
    default:false
  },

  pointsAssignedDate:{
    field: 'points_assigned_date',
    allowNull: false,
    type:DataTypes.DATEONLY,
    default:false
  },

  userAssignedId:{
    field: 'user_assigned_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

  saleId:{
    field: 'user_assigned_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: SALES_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

  saleAssigned:{
    field: 'sale_assigned',
    allowNull: true,
    type:DataTypes.BOOLEAN
  },

  percentageSale:{
    field: 'percentage_sale',
    allowNull: true,
    type:DataTypes.INTEGER
  },

  CreatedAt:{
    allowNull:false,
    type:DataTypes.DATE,
    field:'created_at',
    defaultValue: Sequelize.NOW
  },

  UpdatedAt:{
    allowNull:false,
    type:DataTypes.DATE,
    field:'updated_at',
    defaultValue: Sequelize.NOW
  }



}

class EmployeePointsCollect extends Model{

  static associate (models){

    this.belongsTo(models.User, { as: 'employee' });
    this.belongsTo(models.User, { as: 'userAssigned' });
    this.belongsTo(models.Sales, { as: 'sale' });
    this.belongsTo(models.OperationStatus, { as: 'status' });


    /* this.hasMany(models.Person, {
       as: 'person',
      foreignKey: 'academicDegreeId'
     });*/



  }

  static config(sequelize){
    return {
      sequelize,
      tableName:EMPLOYEE_POINTS_COLLECT_TABLE,
      modelName:'EmployeePointsCollect',
      timestamps:false
    }
  }

}


module.exports = { EmployeePointsCollect, EmployeePointsCollectSchema, EMPLOYEE_POINTS_COLLECT_TABLE };

