const { Product } = require("../schemas/productSchema");
const { createError } = require("../helpers/errors");

const getAllProducts = async () => {
  const products = await Product.find().sort({
    rate: -1,
    promoPrice: -1,
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
      rate: -1,
      promoPrice: -1,
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

const changeProductsQuantity = async (selectedProducts) => {
  const currentQuantity = await Product.find({
    $or: selectedProducts.map(({ _id }) => {
      return { _id };
    }),
  });

  const isNotEnoughQuantity = selectedProducts.some(
    ({ _id, quantity }) =>
      currentQuantity.find((i) => i._id.toString() === _id).quantity < quantity
  );

  if (isNotEnoughQuantity) {
    return false;
  }

  const changeProductsPromises = selectedProducts.map(({ _id, quantity }) =>
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

  const orderedProducts = await Promise.all(changeProductsPromises);

  return orderedProducts;
};

module.exports = {
  getAllProducts,
  getProductById,
  getPopularProducts,
  getRandomProducts,
  changeProductsQuantity,
};
