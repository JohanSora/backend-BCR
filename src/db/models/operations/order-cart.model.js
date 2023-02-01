const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('../catalogs/user.model');
const { OPERATION_STATUS_TABLE } = require('../catalogs/operation-status.model');
const ORDER_CARTS_TABLE = 'order_carts';

const OrderCartSchema = {

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

  orderNumber:{
    allowNull: true,
    type:DataTypes.UUID,
    field:'order_number',
    default: DataTypes.UUIDV4
  },

  productsObject:{
    allowNull: true,
    type:DataTypes.JSON,
    field:'product_object'
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

  digipointSubstract:{
    allowNull: false,
    type:DataTypes.INTEGER,
    field:'digipoint_substract',
    default:0
  },


  CreatedAt:{
    allowNull:false,
    type:DataTypes.DATE,
    field:'created_at',
    defaultValue: Sequelize.NOW
  }



}

class OrderCart extends Model{

  static associate (models){
    //associations
    this.belongsTo(models.User, { as: 'employee' });

  }

  static config(sequelize){
    return {
      sequelize,
      tableName:ORDER_CARTS_TABLE,
      modelName:'OrderCart',
      timestamps:false
    }
  }

}


module.exports = { OrderCart, OrderCartSchema, ORDER_CARTS_TABLE };

