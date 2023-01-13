const { Model, DataTypes, Sequelize } = require('sequelize');

const PRODUCT_TYPE_TABLE = 'products_types';

const ProductTypeSchema = {
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

class ProductType extends Model{

  static associate (models){
     // Associate relationships
   this.hasMany(models.Product, {
      as: 'Product',
      foreignKey: 'productTypeId'
    });


  }

  static config(sequelize){
    return {
      sequelize,
      tableName:PRODUCT_TYPE_TABLE,
      modelName:'ProductType',
      timestamps:false
    }
  }

}


module.exports = { ProductType, ProductTypeSchema, PRODUCT_TYPE_TABLE };
