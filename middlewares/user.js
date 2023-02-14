const User = require("../models/user");
const bigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const jwt = require("jsonwebtoken");

exports.isLoggedIn = bigPromise(async (req, res, next) => {
  const token =
    req.cookies.token || req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return next(new CustomError("Login first to access this page", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = User.findById(decoded.id);

  next();
});
