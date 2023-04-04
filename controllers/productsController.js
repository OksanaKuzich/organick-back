const {
  getAllProducts,
  getProductById,
  getPopularProducts,
  getRandomProducts,
  changeProductsQuantity,
} = require("../services/productsService");
const { createOrder } = require("../services/orderService");
const { createError } = require("../helpers/errors");

const getAllProductsController = async () => {
  const data = await getAllProducts();
  return data;
};

const getProductByIdController = async (req, _, next) => {
  const { id } = req.params;
  const data = await getProductById(id);
  return data;
};

const getPopularProductsController = async () => {
  const data = await getPopularProducts();
  return data;
};

const getRandomProductsController = async () => {
  const data = await getRandomProducts();
  return data;
};

const createProductsOrderController = async (req) => {
  const { orderedProducts } = req.body;
  const orderedProductsQuantities = await changeProductsQuantity(
    orderedProducts
  );
  if (!orderedProductsQuantities) {
    return createError(400, "Not enough products in stock.");
  }
  const selectedProducts = orderedProductsQuantities.map((product) => {
    product.quantity = orderedProducts.find(
      (i) => i._id === product._id.toString()
    ).quantity;
    return product;
  });
  const { owner } = req.body;
  const order = await createOrder(selectedProducts, owner);
  return order;
};

module.exports = {
  getAllProductsController,
  getProductByIdController,
  getPopularProductsController,
  getRandomProductsController,
  createProductsOrderController,
};
