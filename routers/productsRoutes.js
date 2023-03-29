const express = require("express");
const {
  getAllProductsController,
  getProductByIdController,
  getPopularProductsController,
  getRandomProductsController,
  createProductsOrderController,
} = require("../controllers/productsController");
const ctrlWrapper = require("../helpers/ctrlWrapper");

const router = express.Router();

router.get("/", ctrlWrapper(getAllProductsController));

router.get("/popular", ctrlWrapper(getPopularProductsController));

router.get("/random", ctrlWrapper(getRandomProductsController));

router.get("/:id", ctrlWrapper(getProductByIdController));

router.patch("/", ctrlWrapper(createProductsOrderController));

module.exports = router;
