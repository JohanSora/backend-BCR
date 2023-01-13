const { Model, DataTypes, Sequelize } = require('sequelize');

const { PERSON_TABLE } = require('./../catalogs/person.model');
const { POINTS_OF_SALES_TABLE } = require('./../catalogs/points_of_sales.model');

const COMPANY_EMPLOYEES_TABLE = 'company_employees';

const CompanyEmployeeSchema = {

  id:{
    allowNull:false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  personId: {
    field: 'person_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PERSON_TABLE,
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

class CompanyEmployee extends Model{

  static associate (models){

    this.belongsTo(models.Person, { as: 'person' });
    this.belongsTo(models.PointsOfSale, { as: 'pointOfSale' });

    this.hasMany(models.EmployeePointsCollect, {
      as: 'employeePointsCollect',
      foreignKey: 'employId'
    });

    this.hasMany(models.Sales, {
      as: 'sales',
      foreignKey: 'employAssignedId'
    });




    // this.hasMany(models.Person, {
    //   as: 'person',
    //   foreignKey: 'academicDegreeId'
    // });



  }

  static config(sequelize){
    return {
      sequelize,
      tableName:COMPANY_EMPLOYEES_TABLE,
      modelName:'CompanyEmployee',
      timestamps:false
    }
  }

}


module.exports = { CompanyEmployee, CompanyEmployeeSchema, COMPANY_EMPLOYEES_TABLE };

