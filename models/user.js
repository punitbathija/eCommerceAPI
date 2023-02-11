const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
    maxlength: [40, "Name exceeds the maximum"],
  },

  email: {
    type: String,
    required: [true, "Please enter an email id"],
    validate: [validator.isEmail, "Please enter an valid email id"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Please enter a password with more than six characters"],
    select: false,
  },

  photo: {
    id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
  },

  role: {
    type: String,
    default: "user",
  },

  forgotPasswordToken: {
    type: String,
  },

  forgotPasswordTokenExpiry: {
    type: Date,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Encrypting password before saving the password onto the database

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose("User", userSchema);
