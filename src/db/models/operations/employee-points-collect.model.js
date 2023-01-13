const { Model, DataTypes, Sequelize } = require('sequelize');

const { COMPANY_EMPLOYEES_TABLE } = require('./company-employees.model');
const { USER_TABLE } = require('./../catalogs/user.model');
const { SALES_TABLE } = require('./sales.model');


const EMPLOYEE_POINTS_COLLECT_TABLE = 'employee_points_collect';

const EmployeePointsCollectSchema = {

  id:{
    allowNull:false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  employId: {
    field: 'employ_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: COMPANY_EMPLOYEES_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

  status:{
    allowNull: false,
    type:DataTypes.BOOLEAN,
    default:false
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
    type:DataTypes.INTEGER,
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
  }



}

class EmployeePointsCollect extends Model{

  static associate (models){

    this.belongsTo(models.CompanyEmployee, { as: 'companyEmployee' });
    this.belongsTo(models.User, { as: 'user' });
    this.belongsTo(models.Sales, { as: 'sales' });

    // this.hasMany(models.Person, {
    //   as: 'person',
    //   foreignKey: 'academicDegreeId'
    // });
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

