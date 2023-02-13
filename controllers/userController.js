const User = require("../models/user");
const user = require("../models/user");
const bigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");

exports.signup = bigPromise(async (req, res, next) => {
  // Convey to frontend engineer that the filename should be photo
  let result;

  if (req.files) {
    let file = req.files.photo;
    result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: "users",
      width: 150,
      crop: "scale",
    });
  }

  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return next(new CustomError("Please enter email, name & password", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
    photo: {
      id: result.id,
      secure_url: result.secure_url,
    },
  });

  cookieToken(user, res);
});
