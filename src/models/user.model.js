const { Schema, model, models } = require("mongoose");

const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [
      {
        validator(value) {
          return models.User.findOne({ email: value })
            .then((user) => !user)
            .catch(() => false);
        },
        message: "This email already exists",
      },
    ],
  },
  password: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
});
