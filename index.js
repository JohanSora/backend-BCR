const express = require('express');
const cors = require('cors');
const routerApi = require('./src/routes');
require('dotenv').config();
const bodyParser = require('body-parser');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./src/middlewares/error.handler');

const app = express();

//Modification create port
const port = process.env.PORT;
const nodeEnv = process.env.NODE_ENV;

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(express.json());

// cors whitelist accept external to server connections
const whitelist = [
  'http://localhost:8080',
  'https://myapp.com',
  'http://localhost:8050',
  'https://bcr.adobepcclub.net/',
  'https://adobe-bcr.vercel.app/',
];

// Add options method cors manager
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(
        new Error("Connection refused cause,  you don't have permissions ")
      );
    }
  },
};
app.use(cors(options));

//Implement auth strategies passport athorization
require('./src/utils/auth');

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('port connection: ', port);
  console.log('Enviroment: ', nodeEnv);
  console.log('My secret Key: ' + process.env.JWT_SECRET);
});

/*
 * I wont use connect cause change database connection
 * const { connect } = require("./src/db");
 * I wont use superadminRoute cause change schema project
 * const superadminRouter = require("./src/routes/superadmin.route.js");
 * app.use("/superadmin", superadminRouter);
 */
