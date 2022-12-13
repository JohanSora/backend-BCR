// Begin catalog Models
const {  Language, LanguageSchema }                   = require('./catalogs/language.model');
const {  AcademicDegrees, AcademicSchema }            = require('./catalogs/academic-degrees.model');
const {  Award, AwardSchema  }                        = require('./catalogs/award.model');
const {  ProductType, ProductTypeSchema  }            = require('./catalogs/product-type.model');
const {  SalesGroup, SalesGroupSchema  }              = require('./catalogs/sales-group.model');
const {  OperationStatus, OperationStatusSchema  }    = require('./catalogs/operation-status.model');
const {  ErrorSalesProcess, ErrorSalesProcessSchema } = require('./catalogs/error-sales-process.model');
const {  Country, CountrySchema }                     = require('./catalogs/country.model');
const {  City, CitySchema }                           = require('./catalogs/city.model');
const {  State, StateSchema }                         = require('./catalogs/state.model');
const {  Person, PersonSchema }                       = require('./catalogs/person.model');
const {  Company, CompanySchema }                     = require('./catalogs/company.model');
const {  FiscalPeriod, FiscalPeriodSchema }           = require('./catalogs/fiscal-periods.model');

// End Catalog Models


// Begin Operation Models

//--------

// End Operation Models

// Resolve Models
function setupModels(sequelize){

  // catalogs
    Language.init(LanguageSchema, Language.config(sequelize));
    AcademicDegrees.init(AcademicSchema, AcademicDegrees.config(sequelize));
    Award.init(AwardSchema, Award.config(sequelize));
    ProductType.init(ProductTypeSchema, ProductType.config(sequelize));
    SalesGroup.init(SalesGroupSchema, SalesGroup.config(sequelize));
    OperationStatus.init(OperationStatusSchema, OperationStatus.config(sequelize));
    ErrorSalesProcess.init(ErrorSalesProcessSchema, ErrorSalesProcess.config(sequelize));
    Country.init(CountrySchema, Country.config(sequelize));
    City.init(CitySchema, City.config(sequelize));
    State.init(StateSchema, State.config(sequelize));
    Person.init(PersonSchema, Person.config(sequelize));
    Company.init(CompanySchema, Company.config(sequelize));
    FiscalPeriod.init(FiscalPeriodSchema, FiscalPeriod.config(sequelize));



// Relation Association

    Country.associate(sequelize.models);
    City.associate(sequelize.models);
    State.associate(sequelize.models);
    OperationStatus.associate(sequelize.models);
    Language.associate(sequelize.models);
    AcademicDegrees.associate(sequelize.models);
    Person.associate(sequelize.models);
    Company.associate(sequelize.models);
    FiscalPeriod.associate(sequelize.models);

// -------------------------------------


}

module.exports = { setupModels };
