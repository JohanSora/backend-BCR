const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authLider = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error("unauthorized user");
    }

    const [_, token] = authorization.split(" ");

    if (!token) {
      throw new Error("Token are not valid");
    }

    const { id } = jwt.verify(token, process.env.passLider);

    req.user = id;

    next();
  } catch (err) {
    res.status(400).json({ message: "the user could not be autoriz" });
  }
};
