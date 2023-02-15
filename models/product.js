const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a product name"],
    trim: true,
    maxlength: [120, "Product name should not be more than 120 characters"],
  },

  price: {
    type: Number,
    required: [true, "Please provide a product price"],
    maxlength: [5, "Product price should not be more than 5 figures"],
  },

  description: {
    type: String,
    required: [true, "Please provide a product description"],
  },

  photos: [
    {
      id: {
        type: String,
        required: true,
      },

      secure_url: {
        type: String,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: [
      true,
      "Please select categories from (short-sleeves, long-sleeves, polo-shirts, hoodies, sweat-shirts)",
    ],
    enum: {
      values: [
        "shortsleeves",
        "longsleeves",
        "poloshirts",
        "hoodies",
        "sweatshirts",
      ],
      message:
        "Please select categories from (short-sleeves, long-sleeves, polo-shirts, hoodies, sweat-shirts)",
    },
  },

  brand: {
    type: String,
    required: [true, "please add a brand for clothing"],
  },

  ratings: {
    type: String,
    default: 0,
  },

  numberOfReviews: {
    type: Number,
    default: 0,
  },

  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: Number,
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Product", productSchema);
