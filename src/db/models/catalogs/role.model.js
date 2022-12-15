const { Model, DataTypes, Sequelize } = require('sequelize');

const ROLE_TABLE = 'roles';

const RoleSchema = {
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

class Role extends Model{

  static associate(models) {
    this.hasMany(models.User, {
        as: 'user',
        foreignKey: 'roleId'
      });
  }

  static config(sequelize){
    return {
      sequelize,
      tableName:ROLE_TABLE,
      modelName:'Role',
      timestamps:false
    }
  }

}


module.exports = { Role, RoleSchema, ROLE_TABLE };
