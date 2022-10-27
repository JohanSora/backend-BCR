const { Schema, model, models } = require("mongoose");

const LiderSchema = new Schema(
  {
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
              .then((user) => !user)
              .catch(() => false);
          },
        },
      ],
    },

    password: {
      type: String,
      required: true,
    },
    contactAuth: {
      type: Boolean,
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
    currentDigipoints: {
      type: Number,
    },
    currentDigipoints: {
      type: Number,
    },
    historicDigipoints: {
      type: Number,
    },
    historicRedeemDigipoints: {
      type: Number,
    },
    promotions: {
      type: [{ type: Schema.Types.ObjectId, ref: "Promotions" }],
    },
    rewards: {
      type: [{ type: Schema.Types.ObjectId, ref: "Rewards" }],
    },
    sellers: {
      type: [{ type: Schema.Types.ObjectId, ref: "Seller" }],
    },
    roi: {
      type: String,
    },
    agentes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Agentes",
        },
      ],
    },
    superadmins: {
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

const Lider = model("Lider", LiderSchema);

module.exports = Lider;
