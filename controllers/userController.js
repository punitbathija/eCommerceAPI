const User = require("../models/user");
const user = require("../models/user");
const bigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");

exports.signup = bigPromise(async (req, res, next) => {
  const { name, email, password } = req.body;
  // Convey to frontend engineer that the filename should be photo
  let result;

  if (!req.files) {
    return next(new CustomError("Please upload an image to continue", 400));
  }

  if (req.files) {
    let file = req.files.photo;
    result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: "users",
      width: 150,
      crop: "scale",
    });
  }

  if (!email || !name || !password) {
    return next(new CustomError("Please enter email, name & password", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
    photo: {
      id: result.public_id,
      secure_url: result.secure_url,
    },
  });

  cookieToken(user, res);
});

exports.login = bigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password are present
  if (!email || !password) {
    return next(new CustomError("Please enter email & password", 400));
  }

  // comparing email and password
  const user = await User.findOne({ email }).select("+password");

  // if user does not exsist
  if (!user) {
    return next(
      new CustomError("Please enter registered email & password", 400)
    );
  }

  const isPasswordCorrect = await user.validatePassword(password);

  // if password or email is incorrect
  if (!isPasswordCorrect) {
    return next(new CustomError("Please enter correct email & password", 400));
  }
  // if everything goes well we send the token
  cookieToken(user, res);
});

exports.logout = bigPromise(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Successfully Logged Out",
  });
});
