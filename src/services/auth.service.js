const boom = require('@hapi/boom');
const UserService = require('./catalogs/user.service');
const service = new UserService();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('./../../config/config');
const secret = config.jwtSecret;
const saltArround = Number(config.envSalt);

class AuthService {
  // Compare for login
  async getUser(email, password) {
    const user = await service.findByEmail(email);

    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  // Sign Token
  signToken(user) {
    delete user.dataValues.recoveryToken;

    const payload = {
      sub: user.id,
      role: user.roleId,
    };

    const token = jwt.sign(payload, secret);
    return {
      user,
      token,
    };
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('User unauthorized');
    }
    const frontUri = config.frontUri;
    const payload = { sub: user.id };
    const token = jwt.sign(payload, secret, { expiresIn: '15min' });
    const link = `${frontUri}?token=${token}`;

    // save token into DB
    await service.update(user.id, { recoveryToken: token });

    const mail = {
      from: config.mailSetFromAddress, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Email para recuperar contraseña', // Subject line
      html: `<b>Ingresa a este link => <a href="${link}">  Click here </a> </b>`, // html body
    };

    const rta = await this.sendMail(mail);
    return rta;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, secret);
      const user = await service.findOne(payload.sub);

      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }

      const hash = await bcrypt.hash(newPassword, saltArround);

      await service.update(user.id, {
        recoveryToken: null,
        password: hash,
      });

      return { message: 'Password chenged' };
    } catch (error) {
      throw boom.unauthorized(error);
    }
  }

  async sendMail(infoMail) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: config.mailSetHost,
      port: config.mailSetPort,
      //secure: config.mailSetEncrypt, // true for 465, false for other ports
      auth: {
        user: config.mailSetUser,
        pass: config.mailSetPass,
      },
    });

    // send mail with defined transport object
    await transporter.sendMail(infoMail);
    return { message: 'Mail sent' };
  }
}

module.exports = AuthService;
