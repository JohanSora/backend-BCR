require('dotenv').config();

const config = {

  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT  || 3000,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  envSalt: process.env.SALT_ARROUND,
  jwtSecret: process.env.JWT_SECRET,
  mailSetUser : process.env.MAIL_USER_MAIL,
  mailSetPass : process.env.MAIL_PASSWORD,
  mailSetHost : process.env.MAIL_HOST,
  mailSetPort : process.env.MAIL_PORT,
  mailSetEncrypt : process.env.MAIL_ENCRYPTION,
  mailSetFromAddress : process.env.MAIL_FROM_ADDRESS,
  frontUri: process.env.FRONT_URI
}


module.exports = { config }
