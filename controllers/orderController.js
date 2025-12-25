const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (quantity > product.stock) return res.status(400).json({ message: 'Insufficient stock' });

    const total = product.price * quantity;
    const order = await Order.create({ UserId: req.user.id, ProductId: productId, quantity, total });

    product.stock -= quantity;
    await product.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
