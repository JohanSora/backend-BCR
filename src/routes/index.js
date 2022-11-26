const express           = require('express');
const languagesRouter   = require('./languages.router');
const academicDegreeRouter = require('./academic-degrees.router');
const awardRouter = require('./award.router');


//function routes manager
function routerApi(app){

    const router = express.Router();

    app.use('/api/v1', router);

    router.use('/languages', languagesRouter);
    router.use('/academic-degrees', academicDegreeRouter);
    router.use('/awards', awardRouter);

}

module.exports = routerApi

