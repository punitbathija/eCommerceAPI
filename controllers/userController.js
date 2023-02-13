const User = require("../models/user");
const user = require("../models/user");
const bigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");

exports.signup = bigPromise(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return next(new CustomError("Please enter email, name & password", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  cookieToken(user, res);
});
