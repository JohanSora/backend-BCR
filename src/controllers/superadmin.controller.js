const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SuperAdmin = require("../models/superadmin.model");
require("dotenv").config();

module.exports = {
  async createSuperAdmin(req, res) {
    try {
      const { email, password, name, lastname, region, languaje } = req.body;

      const encryptPassword = await bycrypt.hash(
        password,
        Number(process.env.saltRounds)
      );

      const admin = await SuperAdmin.create({
        name,
        lastname,
        email,
        region,
        languaje,
        password: encryptPassword,
      });

      const token = jwt.sign({ id: admin._id }, process.env.pass, {
        expiresIn: 60 * 60 * 24,
      });

      res
        .status(201)
        .json({ token, message: "SuperAdmin created succesfully", admin });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const superadmin = await SuperAdmin.findOne({ email });

      if (!user) {
        throw new Error("User not valid!");
      }

      const isValid = await bycrypt.compare(password, superadmin.password);

      if (!isValid) {
        throw new Error("password not valid!");
      }

      const token = jwt.sign({ id: superadmin._id }, process.env.pass, {
        expiresIn: 60 * 60 * 24,
      });

      res.status(200).json({
        message: "User logged!",
        token,
      });
    } catch (err) {
      res.status(400).json({ message: `User could not login: error:${err}` });
    }
  },
};
