const { Order } = require("../schemas/orderSchema");

const createOrder = async (orderedProducts) => {
  const totalPrice = orderedProducts.reduce(
    (sum, { price, promoPrice, quantity }) => {
      if (promoPrice === 0) {
        return sum + price * quantity;
      }
      return sum + promoPrice * quantity;
    },
    0
  );

  const order = await Order.create({ totalPrice, orderedProducts });
  return order;
};

module.exports = { createOrder };
