const express                   = require('express');
const languagesRouter           = require('./catalogs/languages.router');
const academicDegreeRouter      = require('./catalogs/academic-degrees.router');
const awardRouter               = require('./catalogs/award.router');
const productTypeRouter         = require('./catalogs/product-types.router');
const salesGroupRouter          = require('./catalogs/sales-group.router');
const operationStatusRouter     = require('./catalogs/operation-status.router');
const errorSalesProcessRouter   = require('./catalogs/error-sales-process.router');
const countryRouter             = require('./catalogs/country.router');
const cityRouter                = require('./catalogs/city.router');
const stateRouter               = require('./catalogs/states.router');
const peopleRouter              = require('./catalogs/people.router');
const companyRouter             = require('./catalogs/company.router');
const fiscalPeriodRouter        = require('./catalogs/fiscal-period.router');
const RoleRouter                = require('./catalogs/roles.router');
const UserRouter                = require('./catalogs/users.router');
const ProductRouter                = require('./catalogs/product.router');

//auth routers
const AuthRouter                = require('./auth.router');

// Process file router
const documentUploadRouter                 = require('./operations/base64-document-process.router');
const employeePointsCollectRouter          = require('./operations/employee-points-collect.router');
const quarterRouter                        = require('./operations/quarter.router');
const redeemAwardRouter                    = require('./operations/redeem-awards.router');
const rulesRouter                          = require('./operations/rules.router');
const weeksRouter                          = require('./operations/weeks.router');
const companyEmployeeRouter                = require('./operations/company-employee.router');
// end process file router


//function routes manager
function routerApi(app){

    const router = express.Router();

    app.use('/api/v1', router);

     // catalogs

    router.use('/languages', languagesRouter);
    router.use('/academic-degrees', academicDegreeRouter);
    router.use('/awards', awardRouter);
    router.use('/product-types', productTypeRouter);
    router.use('/sales-groups', salesGroupRouter);
    router.use('/operation-status', operationStatusRouter);
    router.use('/error-sales-process', errorSalesProcessRouter);
    router.use('/countries', countryRouter);
    router.use('/cities', cityRouter);
    router.use('/states', stateRouter);
    router.use('/people', peopleRouter);
    router.use('/companies', companyRouter);
    router.use('/fiscal-periods', fiscalPeriodRouter);
    router.use('/roles', RoleRouter);
    router.use('/users', UserRouter);
    router.use('/products', ProductRouter);

    // end catalogs

    // process
    router.use('/uploads', documentUploadRouter);
    router.use('/employee-poits-collects', employeePointsCollectRouter);
    router.use('/quarters', quarterRouter);
    router.use('/redeem-awards', redeemAwardRouter);
    router.use('/rules', rulesRouter);
    router.use('/weeks', weeksRouter);
    router.use('/company-employees', companyEmployeeRouter);
    // end process


    // Auth
    router.use('/auth', AuthRouter);

    // end auth


}

module.exports = routerApi

