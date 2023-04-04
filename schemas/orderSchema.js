const { Schema, model } = require("mongoose");

const order = new Schema(
  {
    date: { type: Date, default: Date.now },
    totalPrice: {
      type: Number,
      required: [true, "Set total price for order"],
      min: 0,
    },
    owner: {
      fullName: {
        type: String,
        required: [true, "Set name for owner"],
      },
      email: {
        type: String,
        required: [true, "Set email for owner"],
      },
      address: {
        type: String,
        required: [true, "Set address for owner"],
      },
      phone: {
        type: String,
        required: [true, "Set phone for owner"],
      },
      message: {
        type: String,
      },
    },
    orderedProducts: [
      {
        _id: {
          type: String,
          required: [true, "Set id for product"],
          unique: true,
        },
        name: {
          type: String,
          required: [true, "Set name for product"],
          unique: true,
        },
        category: {
          type: String,
          required: [true, "Set category for product"],
        },
        price: {
          type: Number,
          required: [true, "Set price for product"],
          min: 0,
        },
        promoPrice: {
          type: Number,
          default: 0,
          min: 0,
        },
        quantity: {
          type: Number,
          required: [true, "Set rate for product"],
          min: 1,
        },
      },
    ],
  },
  { collection: "orders" }
);

const Order = model("order", order);

module.exports = { Order };
