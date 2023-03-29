const { Schema, model } = require("mongoose");

const product = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for product"],
      unique: true,
    },
    category: {
      type: String,
      required: [true, "Set category for product"],
    },
    image: {
      type: String,
      required: [true, "Set image for product"],
      unique: true,
    },
    rate: {
      type: Number,
      required: [true, "Set rate for product"],
      min: 1,
      max: 5,
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
    shortDescr: {
      type: String,
      required: [true, "Set short desription for product"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Set description for product"],
      unique: true,
    },
    additionalInfo: {
      type: String,
      required: [true, "Set additional info for product"],
      unique: true,
    },
    quantity: {
      type: Number,
      required: [true, "Set rate for product"],
      min: 0,
    },
  },
  { collection: "products" }
);

const Product = model("product", product);

module.exports = { Product };
