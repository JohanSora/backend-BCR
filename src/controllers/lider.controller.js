const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Lider = require("../models/lider.model");
const SuperAdmin = require("../models/superadmin.model");
require("dotenv").config();

module.exports = {
  async createLider(req, res) {
    try {
      const { email, password, name, lastname, region, languaje } = req.body;

      const encryptPassword = await bycrypt.hash(
        password,
        Number(process.env.saltRounds)
      );

      const superadmins = await SuperAdmin.find();

      const lider = await Lider.create({
        name,
        lastname,
        email,
        region,
        languaje,
        password: encryptPassword,
      });

      superadmins.map(async (e) => {
        const superadmin = await SuperAdmin.findById(e._doc._id);

        superadmin.lideres.push(lider);

        superadmin.save({ validateBeforeSave: false });
      });

      const token = jwt.sign({ id: lider._id }, process.env.passLider, {
        expiresIn: 60 * 60 * 24,
      });

      res.status(201).json({
        message: "Lider created succesfully",
        data: { token, lider },
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const lider = await Lider.findOne({ email });

      if (!lider) {
        throw new Error("User not valid!");
      }

      const isValid = await bycrypt.compare(password, lider.password);

      if (!isValid) {
        throw new Error("password not valid!");
      }

      const token = jwt.sign({ id: lider._id }, process.env.passLider, {
        expiresIn: 60 * 60 * 24,
      });

      res.status(200).json({
        message: "User logged!",
        data: {
          token,
          lider,
        },
      });
    } catch (err) {
      res.status(400).json({ message: `User could not login: error:${err}` });
    }
  },

  async loginFromAdmin(req, res) {
    try {
      const { email } = req.body;
      const lider = await Lider.findOne({ email });

      if (!lider) {
        throw new Error("User not valid!");
      }

      const token = jwt.sign({ id: lider._id }, process.env.passLider, {
        expiresIn: 60 * 60 * 24,
      });

      res.status(200).json({
        message: "User logged!",
        data: {
          token,
          lider,
        },
      });
    } catch (err) {
      res.status(400).json({ message: `User could not login: error:${err}` });
    }
  },

  async getLider(req, res) {
    try {
      const liderId = req.user;

      const lider = await Lider.findById(liderId);

      console.log(liderId);

      res.status(200).json({ lider });
    } catch (err) {
      res.status(400).json({ message: "Users cannot be brought" });
    }
  },

  async getAllLiders(req, res) {
    try {
      const lider = await Lider.find();

      res.status(200).json({ lider });
    } catch (err) {
      res.status(400).json({ message: "Users cannot be brought" });
    }
  },

  async updateLider(req, res) {
    try {
      const liderId = req.user;
      const lider = await Lider.findByIdAndUpdate(liderId, req.body, {
        new: true,
      });

      res.status(200).json({ message: "User update", lider });
    } catch (err) {
      res.status(400).json({ message: "User could not be updated", data: err });
    }
  },

  async deleteLider(req, res) {
    try {
      const liderId = req.user;
      const lider = await Lider.findByIdAndDelete(liderId);
      res.status(200).json({ message: "User deleted", lider });
    } catch (error) {
      res.status(200).json({ message: err.message });
    }
  },
};
