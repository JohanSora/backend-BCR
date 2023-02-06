const { Model, DataTypes, Sequelize } = require('sequelize');

const { OPERATION_STATUS_TABLE } = require('./operation-status.model');
const { ACADEMIC_DEGREES_TABLE } = require('./academic-degrees.model');
const { LANGUAGE_TABLE } = require('./language.model');
const { USER_TABLE } = require('./user.model');

const PERSON_TABLE = 'people';

const PersonSchema = {
  id:{
    allowNull:false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  names:{
    allowNull: false,
    type:DataTypes.STRING
  },

  lastName:{
    allowNull: false,
    type:DataTypes.STRING,
    field: "last_name"
  },

  birthDate:{
    allowNull: true,
    type:DataTypes.DATEONLY,
    field: "birth_date"
  },

  position:{
    allowNull: true,
    type:DataTypes.STRING
  },

  phoneNumber:{
    allowNull: true,
    type:DataTypes.STRING
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

  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

  academicDegreeId: {
    field: 'academic_degree_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ACADEMIC_DEGREES_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

  languageId: {
    field: 'language_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: LANGUAGE_TABLE,
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
  },

  secondaryEmail:{
    allowNull:true,
      type: Sequelize.DataTypes.STRING,
      field: 'secondary_email'
  }
}

class Person extends Model{

  static associate(models) {

    this.belongsTo(models.OperationStatus, { as: 'operationStatus' });
    this.belongsTo(models.AcademicDegrees, { as: 'academicDegree' });
    this.belongsTo(models.Language, { as: 'language' });
    this.belongsTo(models.User, { as: 'user' });

    this.hasMany(models.Company, {
      as: 'company',
      foreignKey: 'representativeId'
    });




  }


  static config(sequelize){
    return {
      sequelize,
      tableName:PERSON_TABLE,
      modelName:'Person',
      timestamps:false
    }
  }

}


module.exports = { Person, PersonSchema, PERSON_TABLE };
