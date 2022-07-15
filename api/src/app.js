const express = require("express");
const routes = require("./routes/index.routes.js");
const morgan = require("morgan");

const app = express();

// (MIDDLEWARES)
app.use(morgan("dev"));
app.use(express.json());

// (MAIN ROUTE)
app.use("/", routes);

module.exports = app;
