const express = require("express");
const cors = require("cors");
const { connect } = require("./src/db");
const superadminRouter = require("./src/routes/superadmin.route.js");
const liderRouter = require("./src/routes/lider.route.js");

const port = 8080;
const app = express();
connect();

app.use(express.json());
app.use(cors());

app.use("/superadmin", superadminRouter);
app.use("/lider", liderRouter);

app.listen(port, () => {
  console.log("Estamos al aire con Trueno");
});
