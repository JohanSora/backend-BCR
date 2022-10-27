const { Schema, model, models } = require("mongoose");

const SuperadminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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
            return models.SuperAdmin.findOne({ email: value })
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
    lideres: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Lider",
        },
      ],
    },
    agentes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Agentes",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const SuperAdmin = model("SuperAdmin", SuperadminSchema);

module.exports = SuperAdmin;
