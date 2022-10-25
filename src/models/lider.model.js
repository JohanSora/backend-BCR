const { Schema, model, models } = require("mongoose");

const LiderSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [
      {
        validator(value) {
          return models.Lider.findOne({ email: value })
            .then((user = !user))
            .catch(() => false);
        },
      },
    ],
  },

  password: {
    type: String,
    required: true,
  },

  phone: {
    type: Number,
  },
  picture: {
    type: String,
  },
  region: {
    type: String,
    required: true,
  },
  languaje: {
    type: String,
    required: true,
  },
  agentes: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Agentes",
      },
    ],
  },
  Superadmin: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "SuperAdmin",
        required: true,
      },
    ],
  },
});

const Lider = model("Lider", LiderSchema);

module.exports = Lider;
