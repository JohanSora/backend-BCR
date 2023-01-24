const { Model, DataTypes, Sequelize } = require('sequelize');

 const { ROLE_TABLE } = require('./role.model');

const USER_TABLE = 'users';

const UserSchema = {
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

  email:{
    allowNull: false,
    type:DataTypes.STRING,
    unique:true
  },

  password: {
    allowNull:false,
    type: DataTypes.STRING
  },

  recoveryToken:{
    allowNull: true,
    type:DataTypes.STRING,
    field:'recovery_token'
  },


  profilePhotoPath:{
    allowNull: true,
    type:DataTypes.STRING,
    field:'profile_photo_path'
  },


  roleId: {
    field: 'role_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ROLE_TABLE,
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

class User extends Model{

  static associate(models) {
    this.belongsTo(models.Role, { as: 'role' });

    this.hasMany(models.Person, {
      as: 'person',
      foreignKey: 'userId'
    });

    this.hasMany(models.PointsOfSale, {
      as: 'pointOfSale',
      foreignKey: 'managerId'
    });

    this.hasMany(models.EmployeePointsCollect, {
      as: 'employeePointsCollect',
      foreignKey: 'userAssignedId'
    });


    this.hasMany(models.EmployeePointsCollect, {
      as: 'employee',
      foreignKey: 'employeeId'
    });


    this.hasMany(models.RedeemAwards, {
      as: 'redeemAward',
      foreignKey: 'employeeId'
    });


    this.hasMany(models.Sales, {
      as: 'sales',
      foreignKey: 'employAssignedId'
    });



  }

  static config(sequelize){
    return {
      sequelize,
      tableName:USER_TABLE,
      modelName:'User',
      timestamps:false
    }
  }

}


module.exports = { User, UserSchema, USER_TABLE };
