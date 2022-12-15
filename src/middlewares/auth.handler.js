const boom = require('@hapi/boom');
//const { config } = require('./../../config/config');


function checkRoles(...roles){
    //return middleware
     // console.log('checkRoles: ',roles);

    return (req, res, next) => {
        //console.log('userData: ',req.user);
      const user = req.user;

      if(roles.includes(user.role)){
        next();
      }else{
        next(boom.unauthorized('User or role unauthorized'));
      }
    };


  }


  module.exports = {checkRoles}
