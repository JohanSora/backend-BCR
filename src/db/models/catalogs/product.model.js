const { Model, DataTypes, Sequelize } = require('sequelize');

const { SALES_GROUP_TABLE }= require('./../catalogs/sales-group.model');
const { PRODUCT_TYPE_TABLE } = require('./../catalogs/product-type.model');

const PRODUCT_TABLE = 'products';


const ProductSchema = {
  id:{
    allowNull:false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },


  description:{
    allowNull: false,
    type:DataTypes.STRING
  },

  skuUuid:{
    allowNull: false,
    type:DataTypes.STRING,
    field:'sku_uuid'
  },

  salesGroupId: {
    field: 'sales_group_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: SALES_GROUP_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },


  productTypeId: {
    field: 'product_type_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TYPE_TABLE,
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


  CreatedAt:{
    allowNull:false,
    type:DataTypes.DATE,
    field:'created_at',
    defaultValue: Sequelize.NOW
  }



}

class Product extends Model{

  static associate (models){
    this.belongsTo(models.SalesGroup, { as: 'SalesGroup' });
    this.belongsTo(models.ProductType, { as: 'ProductType' });

    this.hasMany(models.Sales, {
      as: 'sales',
      foreignKey: 'productId'
    });


    // this.hasMany(models.Person, {
    //   as: 'person',
    //   foreignKey: 'academicDegreeId'
    // });
  }

  static config(sequelize){
    return {
      sequelize,
      tableName:PRODUCT_TABLE,
      modelName:'Product',
      timestamps:false
    }
  }

}

module.exports = { Product, ProductSchema, PRODUCT_TABLE }
