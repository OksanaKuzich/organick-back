const { Product } = require("../schemas/productSchema");
const { createError } = require("../helpers/errors");

const getAllProducts = async () => {
  const products = await Product.find().sort({
    promoPrice: -1,
    rate: -1,
    price: -1,
  });
  return products;
};

const getProductById = async (id) => {
  const product = await Product.findOne({ _id: id });
  return product;
};

const getPopularProducts = async () => {
  const products = await Product.find({ promoPrice: { $gt: 0 } })
    .sort({
      promoPrice: -1,
      rate: -1,
    })
    .limit(8);
  return products;
};

const getRandomProducts = async () => {
  const products = await Product.find({ promoPrice: 0 });
  const randomProducts = [];
  do {
    const index = Math.round(Math.random() * (products.length - 1));
    console.log("idx:", index);
    const product = products[index];
    console.log(product);
    if (!randomProducts.some(({ _id }) => _id === product._id)) {
      randomProducts.push(product);
    }
  } while (randomProducts.length < 4);
  return randomProducts
    .sort((a, b) => a.price - b.price)
    .sort((a, b) => b.rate - a.rate);
};

const changeProductsQuantity = async (orderedProducts) => {
  const currentQuantity = await Product.find({
    $or: orderedProducts.map(({ _id }) => {
      return { _id };
    }),
  });
  console.log(orderedProducts);
  const isNotEnoughQuantity = orderedProducts.some(
    ({ _id, quantity }) =>
      currentQuantity.find((i) => i._id.toString() === _id).quantity < quantity
  );

  if (isNotEnoughQuantity) {
    return false;
  }

  const changeProductsPromises = orderedProducts.map(({ _id, quantity }) =>
    Product.findByIdAndUpdate(
      _id,
      {
        quantity:
          currentQuantity.find((i) => i._id.toString() === _id).quantity -
          quantity,
      },
      { new: true }
    )
  );

  const selectedProducts = await Promise.all(changeProductsPromises);

  return selectedProducts;
};

module.exports = {
  getAllProducts,
  getProductById,
  getPopularProducts,
  getRandomProducts,
  changeProductsQuantity,
};
