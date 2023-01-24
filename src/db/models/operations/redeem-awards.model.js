const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./../catalogs/user.model');
const { AWARD_TABLE } = require('./../catalogs/award.model');
const { QUARTERS_TABLE } = require('./../operations/quarters.model');

const REDEEM_AWARDS_TABLE = 'redeem_awards';


const RedeemAwardsSchema = {
  id:{
    allowNull:false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  employeeId: {
    field: 'employee_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

  awardId: {
    field: 'award_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: AWARD_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

  quarterId: {
    field: 'quarter_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: QUARTERS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

  digipointSubstract:{
    allowNull: false,
    type:DataTypes.INTEGER,
    field:'digipoint_substract'
  },


  CreatedAt:{
    allowNull:false,
    type:DataTypes.DATE,
    field:'created_at',
    defaultValue: Sequelize.NOW
  }



}

class RedeemAwards extends Model{

  static associate (models){
    this.belongsTo(models.User, { as: 'employee' });
    this.belongsTo(models.Award, { as: 'award' });
    this.belongsTo(models.Quarter, { as: 'quarter' });


   /*  this.hasMany(models.Sales, {
      as: 'sales',
      foreignKey: 'fileUploadId'
    }); */


  }

  static config(sequelize){
    return {
      sequelize,
      tableName:REDEEM_AWARDS_TABLE,
      modelName:'RedeemAwards',
      timestamps:false
    }
  }

}


module.exports = { RedeemAwards, RedeemAwardsSchema, REDEEM_AWARDS_TABLE };
