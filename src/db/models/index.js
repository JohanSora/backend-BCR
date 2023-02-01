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
const {  Role, RoleSchema }                           = require('./catalogs/role.model');
const {  User, UserSchema }                           = require('./catalogs/user.model');
const {  PointsOfSale, PointsOfSaleSchema }           = require('./catalogs/points_of_sales.model');
const {  Product, ProductSchema }                     = require('./catalogs/product.model');

// End Catalog Models


// Begin Operation Models
const {  EmployeePos, EmployeePosSchema }                       = require('./operations/employees-pos.model');
const {  CsvFilesProcessed, CsvFilesProcessedSchema }           = require('./operations/csv-files-processed.model');
const {  EmployeePointsCollect, EmployeePointsCollectSchema }   = require('./operations/employee-points-collect.model');
const {  Sales, SalesSchema }                                   = require('./operations/sales.model');
const {  Quarter, QuarterSchema }                               = require("./operations/quarters.model");
const {  Weeks, WeekSchema }                                    = require("./operations/weeks.model");
const {  RedeemAwards, RedeemAwardsSchema }                     = require("./operations/redeem-awards.model");
const {  Rules, RulesSchema }                                   = require("./operations/rules.model");
const {  OrderCart, OrderCartSchema}                                   = require("./operations/order-cart.model");


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
    Role.init(RoleSchema, Role.config(sequelize));
    User.init(UserSchema, User.config(sequelize));
    PointsOfSale.init(PointsOfSaleSchema, PointsOfSale.config(sequelize));
    Product.init(ProductSchema, Product.config(sequelize));


    // Begbin process


    EmployeePos.init(EmployeePosSchema, EmployeePos.config(sequelize));
    CsvFilesProcessed.init(CsvFilesProcessedSchema, CsvFilesProcessed.config(sequelize));
    EmployeePointsCollect.init(EmployeePointsCollectSchema, EmployeePointsCollect.config(sequelize));
    Sales.init(SalesSchema, Sales.config(sequelize));
    Quarter.init(QuarterSchema, Quarter.config(sequelize));
    Weeks.init(WeekSchema, Weeks.config(sequelize));
    RedeemAwards.init(RedeemAwardsSchema, RedeemAwards.config(sequelize));
    Rules.init(RulesSchema, Rules.config(sequelize));
    OrderCart.init(OrderCartSchema, OrderCart.config(sequelize));


    // End Process





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
    Role.associate(sequelize.models);
    User.associate(sequelize.models);
    PointsOfSale.associate(sequelize.models);
    Product.associate(sequelize.models);
    EmployeePos.associate(sequelize.models);
    CsvFilesProcessed.associate(sequelize.models);
    EmployeePointsCollect.associate(sequelize.models);
    Sales.associate(sequelize.models);
    Quarter.associate(sequelize.models);
    Weeks.associate(sequelize.models);
    RedeemAwards.associate(sequelize.models);
    Rules.associate(sequelize.models);
    OrderCart.associate(sequelize.models);

// -------------------------------------


}

module.exports = { setupModels };
