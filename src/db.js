const mongoose = require("mongoose");

function connect() {
  mongoose.connect(
    "mongodb+srv://itmarketlogic:10293847Marketlogic@cluster0.dmebfiq.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  mongoose.connection.once("open", () => {
    console.log("Mongo is alive!");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Something went wrong!", err);
  });

  return mongoose.connection;
}

module.exports = { connect };
