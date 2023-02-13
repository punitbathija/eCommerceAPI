require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

// swagger documentation and swagger middleware
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookies and files middlewares
app.use(cookieParser());
app.use(fileUpload());

// morgan middleware
app.use(morgan("tiny"));

// importing all the routes here
const home = require("./routes/home");
const user = require("./routes/user");

// router middleware
app.use("/api/v1", home);
app.use("/api/v1", user);

// exporting app.js
module.exports = app;
