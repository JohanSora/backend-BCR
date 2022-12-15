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

//auth routers
const AuthRouter                = require('./auth.router');

// Process file router

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

    // end catalogs

    // process
    // end process


    // Auth
    router.use('/auth', AuthRouter);
    // end auth


}

module.exports = routerApi

