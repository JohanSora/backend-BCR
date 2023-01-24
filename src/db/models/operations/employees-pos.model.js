const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('../catalogs/user.model');
const { POINTS_OF_SALES_TABLE } = require('../catalogs/points_of_sales.model');

const EMPLOYEE_POS_TABLE = 'employee_pos';

const EmployeePosSchema = {

  id:{
    allowNull:false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  employeeId: {
    field: 'employee_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
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


  CreatedAt:{
    allowNull:false,
    type:DataTypes.DATE,
    field:'created_at',
    defaultValue: Sequelize.NOW
  }



}

class EmployeePos extends Model{

  static associate (models){
    //associations
    this.belongsTo(models.User, { as: 'employee' });
    this.belongsTo(models.PointsOfSale, { as: 'pos' });
  }

  static config(sequelize){
    return {
      sequelize,
      tableName:EMPLOYEE_POS_TABLE,
      modelName:'EmployeePos',
      timestamps:false
    }
  }

}


module.exports = { EmployeePos, EmployeePosSchema, EMPLOYEE_POS_TABLE };

