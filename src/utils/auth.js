const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    const obj = req.headers;

    console.log(obj);

    next();
  } catch (err) {
    res.status(400).json({ message: "the user could not be autoriz" });
  }
};
