require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");

// morgan middleware
app.use(morgan("tiny"));

// importing all the routes here
const home = require("./routes/home");

// router middleware
app.use("/api/v1", home);

// exporting app.js
module.exports = app;
